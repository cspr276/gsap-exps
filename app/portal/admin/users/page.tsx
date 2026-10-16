'use client';

import { useState, useEffect, useMemo } from 'react';
import { Search } from 'lucide-react';
import AdminShell from '@/components/portal/admin/AdminShell';
import {
  getStoredAdminUsers,
  toggleAdminUserStatus,
  verifyAdminContributor,
  INITIAL_ADMIN_USERS,
  AdminUserItem,
} from '@/lib/portal-admin-data';

export default function AdminUsersPage() {
  const [users, setUsers] = useState<AdminUserItem[]>(INITIAL_ADMIN_USERS);
  const [roleFilter, setRoleFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  const refreshUsers = () => {
    setUsers(getStoredAdminUsers());
  };

  useEffect(() => {
    refreshUsers();
  }, []);

  const handleToggleStatus = (userId: string) => {
    toggleAdminUserStatus(userId);
    refreshUsers();
  };

  const handleVerifyEc = (userId: string) => {
    verifyAdminContributor(userId);
    refreshUsers();
  };

  const filteredUsers = useMemo(() => {
    return users.filter((u) => {
      const matchesRole = roleFilter === 'all' || u.role === roleFilter;
      const matchesStatus = statusFilter === 'all' || u.status === statusFilter;
      const matchesSearch =
        searchQuery === '' ||
        u.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        u.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (u.companyName && u.companyName.toLowerCase().includes(searchQuery.toLowerCase()));
      return matchesRole && matchesStatus && matchesSearch;
    });
  }, [users, roleFilter, statusFilter, searchQuery]);

  const stats = useMemo(() => {
    const ecs = users.filter((u) => u.role === 'ec');
    const employers = users.filter((u) => u.role === 'employer');
    const admins = users.filter((u) => u.role === 'admin');
    const verifiedEcs = ecs.filter((u) => u.verificationStatus === 'verified');
    const pendingEcs = ecs.filter((u) => u.verificationStatus === 'pending');

    return {
      total: users.length,
      ecsCount: ecs.length,
      verifiedEcsCount: verifiedEcs.length,
      pendingEcsCount: pendingEcs.length,
      employersCount: employers.length,
      adminsCount: admins.length,
    };
  }, [users]);

  return (
    <AdminShell>
      {/* Editorial Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pb-8 border-b border-neutral-200 dark:border-neutral-800">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="font-mono text-[11px] tracking-wider uppercase text-neutral-500 dark:text-neutral-400">
              Identity & Access Management
            </span>
            <span className="inline-block w-1 h-1 rounded-full bg-neutral-300 dark:bg-neutral-700" />
            <span className="font-mono text-[11px] tracking-wider uppercase text-neutral-500 dark:text-neutral-400">
              {users.length} Registered Accounts
            </span>
          </div>
          <h1 className="font-display font-bold text-2xl sm:text-3xl text-neutral-900 dark:text-white tracking-tight">
            Verified Users & EC Profiles
          </h1>
          <p className="mt-1 text-xs sm:text-sm text-neutral-500 dark:text-neutral-400 max-w-xl">
            Oversee platform member credentials, verify expert contributor backgrounds, and enforce account statuses.
          </p>
        </div>
      </div>

      {/* Role Breakdown Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-6">
        <div className="p-4 sm:p-5 rounded-xl border border-neutral-200/90 dark:border-neutral-800 bg-white dark:bg-neutral-900/90 shadow-[0_2px_8px_rgb(0,0,0,0.02)]">
          <div className="text-neutral-400 dark:text-neutral-500 mb-2">
            <span className="font-mono text-xs uppercase tracking-wider font-semibold">Expert Contributors (ECs)</span>
          </div>
          <div className="font-display font-bold text-2xl text-neutral-900 dark:text-white">
            {stats.ecsCount}
          </div>
          <p className="font-mono text-[11px] text-neutral-500 dark:text-neutral-400 mt-1">
            {stats.verifiedEcsCount} Verified • {stats.pendingEcsCount} Pending Review
          </p>
        </div>

        <div className="p-4 sm:p-5 rounded-xl border border-neutral-200/90 dark:border-neutral-800 bg-white dark:bg-neutral-900/90 shadow-[0_2px_8px_rgb(0,0,0,0.02)]">
          <div className="text-neutral-400 dark:text-neutral-500 mb-2">
            <span className="font-mono text-xs uppercase tracking-wider font-semibold">Client Employers</span>
          </div>
          <div className="font-display font-bold text-2xl text-neutral-900 dark:text-white">
            {stats.employersCount}
          </div>
          <p className="font-mono text-[11px] text-neutral-500 dark:text-neutral-400 mt-1">
            Active evaluation sponsor accounts
          </p>
        </div>

        <div className="p-4 sm:p-5 rounded-xl border border-neutral-200/90 dark:border-neutral-800 bg-white dark:bg-neutral-900/90 shadow-[0_2px_8px_rgb(0,0,0,0.02)]">
          <div className="text-neutral-400 dark:text-neutral-500 mb-2">
            <span className="font-mono text-xs uppercase tracking-wider font-semibold">Platform Admins</span>
          </div>
          <div className="font-display font-bold text-2xl text-neutral-900 dark:text-white">
            {stats.adminsCount}
          </div>
          <p className="font-mono text-[11px] text-neutral-500 dark:text-neutral-400 mt-1">
            2FA Enforced Security Leads
          </p>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="mt-6 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
        <div className="relative flex-1 max-w-md">
          <input
            type="text"
            placeholder="Search by name, email, or company..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-4 py-2 rounded-lg text-xs font-mono bg-white dark:bg-neutral-900 border border-neutral-200/90 dark:border-neutral-800 text-neutral-900 dark:text-white placeholder:text-neutral-400 focus:outline-none focus:ring-1 focus:ring-neutral-900 dark:focus:ring-neutral-400 transition-colors"
          />
          <Search className="w-3.5 h-3.5 text-neutral-400 absolute left-3 top-2.5 pointer-events-none" />
        </div>

        <div className="flex items-center gap-2">
          {/* Role Filter */}
          <select
            value={roleFilter}
            onChange={(e) => setRoleFilter(e.target.value)}
            className="px-3 py-2 rounded-lg text-xs font-mono bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 text-neutral-900 dark:text-white focus:outline-none cursor-pointer"
          >
            <option value="all">All Roles ({users.length})</option>
            <option value="ec">Contributors (ECs)</option>
            <option value="employer">Employers</option>
            <option value="admin">Admins</option>
          </select>

          {/* Status Filter */}
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-3 py-2 rounded-lg text-xs font-mono bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 text-neutral-900 dark:text-white focus:outline-none cursor-pointer"
          >
            <option value="all">All Statuses</option>
            <option value="active">Active Only</option>
            <option value="suspended">Suspended Only</option>
          </select>
        </div>
      </div>

      {/* User Table */}
      <div className="mt-6 rounded-2xl border border-neutral-200/90 dark:border-neutral-800 bg-white dark:bg-neutral-900/90 overflow-hidden shadow-[0_2px_8px_rgb(0,0,0,0.02)]">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-neutral-200/80 dark:border-neutral-800 bg-neutral-50/50 dark:bg-neutral-950/40 text-[11px] font-mono tracking-wider uppercase text-neutral-500 dark:text-neutral-400">
                <th className="py-3 px-4 sm:px-6">Member</th>
                <th className="py-3 px-4">Role</th>
                <th className="py-3 px-4">Verification</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-100 dark:divide-neutral-800/80 text-xs">
              {filteredUsers.length === 0 ? (
                <tr>
                  <td colSpan={5} className="py-8 text-center text-neutral-400 font-mono">
                    No users match current filters.
                  </td>
                </tr>
              ) : (
                filteredUsers.map((u) => (
                  <tr
                    key={u.id}
                    className="hover:bg-neutral-50/60 dark:hover:bg-neutral-800/30 transition-colors"
                  >
                    {/* User Info */}
                    <td className="py-3.5 px-4 sm:px-6">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-neutral-100 dark:bg-neutral-800 flex items-center justify-center font-mono text-xs font-bold text-neutral-900 dark:text-white flex-shrink-0">
                          {u.name
                            .split(' ')
                            .map((n) => n[0])
                            .join('')
                            .slice(0, 2)}
                        </div>
                        <div className="min-w-0">
                          <div className="font-semibold text-neutral-900 dark:text-white truncate">
                            {u.name}
                          </div>
                          <div className="font-mono text-[11px] text-neutral-500 dark:text-neutral-400 truncate">
                            {u.email}
                            {u.companyName && ` • ${u.companyName}`}
                          </div>
                        </div>
                      </div>
                    </td>

                    {/* Role Pill */}
                    <td className="py-3.5 px-4">
                      <span
                        className={`inline-block px-2 py-0.5 rounded text-[10px] font-mono uppercase font-semibold ${
                          u.role === 'admin'
                            ? 'bg-neutral-900 text-white dark:bg-white dark:text-neutral-900'
                            : u.role === 'employer'
                            ? 'bg-purple-100 dark:bg-purple-950/60 text-purple-800 dark:text-purple-300'
                            : 'bg-neutral-100 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300'
                        }`}
                      >
                        {u.role === 'ec' ? 'Contributor' : u.role}
                      </span>
                    </td>

                    {/* Verification Status */}
                    <td className="py-3.5 px-4">
                      {u.verificationStatus === 'verified' ? (
                        <span className="font-mono text-[11px] text-emerald-600 dark:text-emerald-400 font-medium">
                          Verified
                        </span>
                      ) : u.verificationStatus === 'pending' ? (
                        <span className="font-mono text-[11px] text-amber-600 dark:text-amber-400 font-medium">
                          Pending Review
                        </span>
                      ) : (
                        <span className="font-mono text-[11px] text-neutral-400">Unverified</span>
                      )}
                    </td>

                    {/* Account Status */}
                    <td className="py-3.5 px-4">
                      <span
                        className={`inline-block px-2 py-0.5 rounded text-[10px] font-mono font-medium ${
                          u.status === 'active'
                            ? 'bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-300'
                            : 'bg-red-50 dark:bg-red-950/40 text-red-700 dark:text-red-300'
                        }`}
                      >
                        {u.status}
                      </span>
                    </td>

                    {/* Actions */}
                    <td className="py-3.5 px-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        {u.role === 'ec' && u.verificationStatus === 'pending' && (
                          <button
                            type="button"
                            onClick={() => handleVerifyEc(u.id)}
                            className="px-2.5 py-1 rounded-md text-[11px] font-mono font-semibold bg-emerald-600 hover:bg-emerald-700 text-white transition-colors cursor-pointer shadow-xs"
                          >
                            Verify EC
                          </button>
                        )}

                        {u.role !== 'admin' && (
                          <button
                            type="button"
                            onClick={() => handleToggleStatus(u.id)}
                            className={`px-2.5 py-1 rounded-md text-[11px] font-mono transition-colors cursor-pointer ${
                              u.status === 'active'
                                ? 'text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-950/30'
                                : 'text-emerald-600 dark:text-emerald-400 hover:bg-emerald-50 dark:hover:bg-emerald-950/30'
                            }`}
                          >
                            {u.status === 'active' ? 'Suspend' : 'Activate'}
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </AdminShell>
  );
}

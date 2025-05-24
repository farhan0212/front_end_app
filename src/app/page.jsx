"use client";

import { useEffect, useState } from "react";

export default function Users() {
  const [users, setUsers] = useState([]);
  const [form, setForm] = useState({ name: "", email: "" });
  const [editId, setEditId] = useState(null);

  const apiURL = "api/users";

  const fetchUsers = () => {
    fetch(apiURL)
      .then((res) => res.json())
      .then(setUsers)
      .catch(console.error);
  };

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const method = editId ? "PUT" : "POST";
    const url = editId ? `${apiURL}/${editId}` : apiURL;

    await fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });

    setForm({ name: "", email: "" });
    setEditId(null);
    fetchUsers();
  };

  const handleEdit = (user) => {
    setForm({ name: user.name, email: user.email });
    setEditId(user.id);
  };

  const handleDelete = async (id) => {
    if (confirm("Yakin ingin menghapus user ini?")) {
      await fetch(`${apiURL}/${id}`, { method: "DELETE" });
      fetchUsers();
    }
  };

  return (
    <>
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          <div className="bg-white shadow-lg rounded-lg overflow-hidden">
            <div className="p-6">
              <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
                {editId ? "Edit User" : "Tambah User"}
              </h2>
              <div>
                <form
                  onSubmit={handleSubmit}
                  className="space-y-4 md:space-y-0 md:flex md:gap-4 md:items-end">
                  <div className="flex-1">
                    <label
                      htmlFor="name"
                      className="block text-sm font-medium text-gray-700">
                      Nama
                    </label>
                    <input
                      type="text"
                      name="name"
                      id="name"
                      placeholder="Masukkan nama"
                      value={form.name}
                      onChange={handleChange}
                      required
                      className="text-black mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 transition-all"
                    />
                  </div>

                  <div className="flex-1">
                    <label
                      htmlFor="email"
                      className="block text-sm font-medium text-gray-700">
                      Email
                    </label>
                    <input
                      type="email"
                      name="email"
                      id="email"
                      placeholder="Masukkan email"
                      value={form.email}
                      onChange={handleChange}
                      required
                      className=" text-black mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 transition-all"
                    />
                  </div>
                  <div className="flex space-x-2">
                    <button
                      type="submit"
                      className={`px-4 py-2 rounded-md text-white font-medium shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 transition-all ${
                        editId
                          ? "bg-amber-500 hover:bg-amber-600 focus:ring-amber-500"
                          : "bg-indigo-600 hover:bg-indigo-700 focus:ring-indigo-500"
                      }`}>
                      {editId ? "Update" : "Tambah"}
                    </button>

                    {editId && (
                      <button
                        type="button"
                        onClick={() => {
                          setEditId(null);
                          setForm({ name: "", email: "" });
                        }}
                        className="px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded-md text-gray-700 font-medium shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 transition-all">
                        Batal
                      </button>
                    )}
                  </div>
                </form>
              </div>
            </div>
          </div>

          <div className="mt-8 bg-white shadow-lg rounded-lg overflow-hidden">
            <h3 className="text-xl font-bold text-gray-800 mb-4">
              Daftar User
            </h3>

            {users.length === 0 ? (
              <p className="text-gray-500 text-center py-4">
                Tidak ada user yang tersedia
              </p>
            ) : (
              <ul className="divide-y divide-gray-200">
                {users.map((user) => (
                  <li
                    key={user.id}
                    className="py-4 flex flex-col sm:flex-row sm:items-center justify-between group hover:bg-gray-50 px-2 rounded-md transition-all">
                    <div className="mb-2 sm:mb-0">
                      <p className="text-sm font-medium text-gray-900">
                        {user.name}
                      </p>
                      <p className="text-sm text-gray-500">{user.email}</p>
                    </div>

                    <div className="flex space-x-2 self-end sm:self-center">
                      <button
                        onClick={() => handleEdit(user)}
                        className="px-3 py-1 bg-blue-100 text-blue-700 rounded-md hover:bg-blue-200 transition-all text-sm">
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(user.id)}
                        className="px-3 py-1 bg-red-100 text-red-700 rounded-md hover:bg-red-200 transition-all text-sm">
                        Hapus
                      </button>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

import { useEffect, useState } from 'react'

interface User {
  id: number
  email: string
  name: string | null
  createdAt: string
}

export default function UserList() {
  const [users, setUsers] = useState<User[]>([])
  const [email, setEmail] = useState('')
  const [name, setName] = useState('')

  useEffect(() => {
    fetch('/api/user')
      .then(res => res.json())
      .then(data => setUsers(data))
  }, [])

  const addUser = async () => {
    if (!email) return
    const res = await fetch('/api/user', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, name }),
    })
    const user: User = await res.json()
    setUsers(prev => [...prev, user])
    setEmail('')
    setName('')
  }

  return (
    <div className="p-6 bg-white rounded shadow-md max-w-lg mx-auto">
      <h1 className="text-2xl font-bold mb-4">User 관리</h1>

      <div className="flex mb-6 space-x-2">
        <input
          type="text"
          placeholder="이메일"
          value={email}
          onChange={e => setEmail(e.target.value)}
          className="border p-2 rounded flex-1"
        />
        <input
          type="text"
          placeholder="이름 (선택)"
          value={name}
          onChange={e => setName(e.target.value)}
          className="border p-2 rounded flex-1"
        />
        <button
          onClick={addUser}
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          추가
        </button>
      </div>

      <ul className="divide-y">
        {users.map(u => (
          <li key={u.id} className="py-3">
            <p className="font-medium">{u.email}</p>
            <p className="text-gray-500">{u.name || '이름 없음'}</p>
          </li>
        ))}
      </ul>
    </div>
  )
}

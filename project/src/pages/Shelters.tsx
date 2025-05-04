// Shelters.tsx (simplified)

import React, { useEffect, useState } from "react";

interface Shelter {
  _id: string;
  name: string;
  address: string;
  capacity: number;
  // ...any other fields
}

export default function Shelters() {
  const [shelters, setShelters] = useState<Shelter[]>([]);

  useEffect(() => {
    fetch("/api/shelters")
      .then((res) => res.json())
      .then(setShelters)
      .catch(console.error);
  }, []);

  return (
    <div>
      <h1>Shelter Homes</h1>
      <ul>
        {shelters.map((s) => (
          <li key={s._id}>
            <strong>{s.name}</strong> — {s.address} (Capacity: {s.capacity})
          </li>
        ))}
      </ul>
    </div>
  );
}

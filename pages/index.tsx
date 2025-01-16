import { useState } from 'react';

export default function Home() {
  const [qr, setQr] = useState('');
  const [result, setResult] = useState<any>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const response = await fetch(`/api/validate-qr?qr=${qr}`);
    const data = await response.json();
    setResult(data);
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Validador de QR</h1>
      <form onSubmit={handleSubmit} className="mb-4">
        <input
          type="text"
          value={qr}
          onChange={(e) => setQr(e.target.value)}
          placeholder="Ingrese el código QR"
          className="border p-2 mr-2"
        />
        <button type="submit" className="bg-blue-500 text-white p-2 rounded">
          Validar
        </button>
      </form>
      {result && (
        <pre className="bg-gray-100 p-4 rounded">
          {JSON.stringify(result, null, 2)}
        </pre>
      )}
    </div>
  );
}


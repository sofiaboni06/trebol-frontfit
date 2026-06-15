import React, { useEffect, useState } from 'react';
import api from '../../services/api';
import { LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer } from 'recharts';

const AnalyticsDashboard: React.FC = () => {
  const [data, setData] = useState<any>(null);

  const fetchData = async () => {
    try {
      const resp = await api.get('/api/admin/analytics/dashboard');
      setData(resp.data);
    } catch (e) {
      // noop
    }
  };

  useEffect(() => {
    fetchData();
    const iv = setInterval(fetchData, 30_000);
    return () => clearInterval(iv);
  }, []);

  const series = data ? [
    { name: 'Ventas', value: data.ventasMes || 0 },
    { name: 'Usos IA', value: data.usosIA || 0 },
    { name: 'Escaneos', value: data.escaneos || 0 }
  ] : [];

  return (
    <div className="container mt-4">
      <h3>Analytics - Dashboard</h3>
      <div className="row g-3">
        <div className="col-md-3">
          <div className="card p-3">
            <div className="card-body">
              <h6>Ventas (hoy)</h6>
              <h4>{data?.ventasDia ?? '-'}</h4>
            </div>
          </div>
        </div>
        <div className="col-md-3">
          <div className="card p-3">
            <div className="card-body">
              <h6>Utilidad (mes)</h6>
              <h4>{data?.utilidadMes ?? '-'}</h4>
            </div>
          </div>
        </div>
        <div className="col-md-3">
          <div className="card p-3">
            <div className="card-body">
              <h6>Usos IA</h6>
              <h4>{data?.usosIA ?? '-'}</h4>
            </div>
          </div>
        </div>
        <div className="col-md-3">
          <div className="card p-3">
            <div className="card-body">
              <h6>Escaneos</h6>
              <h4>{data?.escaneos ?? '-'}</h4>
            </div>
          </div>
        </div>
      </div>

      <div className="row mt-4">
        <div className="col-md-6">
          <div className="card p-3">
            <h6>Ventas / Mes</h6>
            <div style={{ width: '100%', height: 250 }}>
              <ResponsiveContainer>
                <LineChart data={series}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Line type="monotone" dataKey="value" stroke="#8884d8" />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        <div className="col-md-6">
          <div className="card p-3">
            <h6>Usos IA / Escaneos</h6>
            <div style={{ width: '100%', height: 250 }}>
              <ResponsiveContainer>
                <LineChart data={series}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Line type="monotone" dataKey="value" stroke="#82ca9d" />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnalyticsDashboard;

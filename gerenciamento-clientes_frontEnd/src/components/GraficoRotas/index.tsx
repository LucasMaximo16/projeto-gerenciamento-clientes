/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Key, useEffect, useRef } from 'react';
import styles from './styles.module.sass';
import Chart from 'chart.js/auto';

interface ClienteProps {
  nome: string;
  telefone: string;
  coordenada_x: number;
  coordenada_y: number;
}

const GraficoRota = ({ dados }: any) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    if (canvasRef.current) {
      const ctx = canvasRef.current.getContext('2d');

      if (ctx) {
        // Adicionando o ponto de origem para o retorno
        const dadosCompletos = [{ coordenada_x: 0, coordenada_y: 0, nome: 'Empresa', telefone: '582147963' },...dados, { coordenada_x: 0, coordenada_y: 0, nome: 'Empresa', telefone: '582147963' }];

        const chart = new Chart(ctx, {
          type: 'line',
          data: {
            datasets: [{
              label: 'Rota de Entrega',
              data: dadosCompletos.map((d: ClienteProps, index: number) => ({
                x: d.coordenada_x,
                y: d.coordenada_y,
                nome: d.nome,
                telefone: d.telefone
              })),
              fill: false,
              borderColor: 'rgb(75, 192, 192)',
              tension: 0.1,
            }]
          },
          options: {
            scales: {
              x: {
                type: 'linear',
                position: 'bottom'
              },
              y: {
                type: 'linear'
              }
            },
            plugins: {
              tooltip: {
                callbacks: {
                  label: function(context) {
                    const label = context.raw
                      return `${label.nome}: ${label.telefone}`;
                  }
                }
              }
            }
          }
        });

        return () => chart.destroy();
      }
    }
  }, [dados]);

  return (
    <>
      <div className={styles.container}>
          <canvas ref={canvasRef}></canvas>
          <div className={styles.rotaTable}>
              <h2 style={{
                  color: "#def1ea",
                  background: "#348869",
                  width: "100%",
                  display: "flex",
                  justifyContent: "center",
              }}>
                ORDEM DE VISITAÇÃO
              </h2>
              <table className={styles.tableRota}>
                  <thead>
                      <tr>
                          <th className={styles.tableth}>Nome</th>
                          <th className={styles.tableth}>Telefone</th>
                          <th className={styles.tableth}>Coordenada X</th>
                          <th className={styles.tableth}>Coordenada Y</th>
                      </tr>
                  </thead>
                  <tbody>
                      {dados.map((cliente: ClienteProps, index: Key) => (
                          <tr key={index}>
                              <td className={styles.tabletd}>{cliente.nome}</td>
                              <td className={styles.tabletd}>{cliente.telefone}</td>
                              <td className={styles.tabletd}>{cliente.coordenada_x}</td>
                              <td className={styles.tabletd}>{cliente.coordenada_y}</td>
                          </tr>
                      ))}
                  </tbody>
              </table>
          </div>
      </div>
    </>
  );
};

export default GraficoRota;

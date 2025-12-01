import React, { useState } from 'react';
import { ChevronDown, ChevronUp, FileText, TrendingUp, Users, Zap, Download, Lock, LogOut, Eye, Search } from 'lucide-react';

const DiagnosticoGresanova = () => {
  const [vista, setVista] = useState('formulario');
  const [aspectoActual, setAspectoActual] = useState('finanzas');
  const [respuestas, setRespuestas] = useState({});
  const [expandido, setExpandido] = useState({});
  const [autenticado, setAutenticado] = useState(false);   
  const [clientes, setClientes] = useState([
    { id: 1, nombre: 'Juan Pérez', empresa: 'Tech Solutions SA', email: 'juan@tech.com', fecha: '2024-11-20' },
    { id: 2, nombre: 'María González', empresa: 'Innovación MX', email: 'maria@innovacion.mx', fecha: '2024-11-22' }
  ]);
  const [filtroCliente, setFiltroCliente] = useState('');
  const [clienteSeleccionado, setClienteSeleccionado] = useState(null);
  
  const [nombreCliente, setNombreCliente] = useState('');
  const [emailCliente, setEmailCliente] = useState('');
  const [empresaCliente, setEmpresaCliente] = useState('');

  const aspectos = {
    finanzas: {
      titulo: 'Finanzas',
      icono: TrendingUp,
      color: 'bg-green-500',
      secciones: [
        {
          nombre: 'Indicadores Financieros Clave',
          preguntas: [
            { id: 'ingreso_bruto', label: 'Ingreso Bruto Mensual/Anual', tipo: 'numero', unidad: '$' },
            { id: 'ingreso_neto', label: 'Ingreso Neto', tipo: 'numero', unidad: '$' },
            { id: 'margen_bruto', label: 'Margen Bruto (%)', tipo: 'numero', unidad: '%' },
            { id: 'margen_neto', label: 'Margen Neto (%)', tipo: 'numero', unidad: '%' },
            { id: 'punto_equilibrio', label: '¿Conoce su punto de equilibrio?', tipo: 'select', opciones: ['Sí', 'No', 'Parcialmente'] },
            { id: 'costo_adquisicion', label: 'Costo de Adquisición por Cliente (CAC)', tipo: 'numero', unidad: '$' },
            { id: 'valor_vida_cliente', label: 'Valor de Vida del Cliente (LTV)', tipo: 'numero', unidad: '$' }
          ]
        },
        {
          nombre: 'Flujo de Caja y Liquidez',
          preguntas: [
            { id: 'flujo_caja_positivo', label: '¿Tiene flujo de caja positivo?', tipo: 'select', opciones: ['Siempre', 'La mayoría del tiempo', 'Rara vez', 'Nunca'] },
            { id: 'reserva_efectivo', label: 'Reserva de efectivo (meses de operación)', tipo: 'numero', unidad: 'meses' },
            { id: 'cuentas_por_cobrar', label: 'Días promedio de cuentas por cobrar', tipo: 'numero', unidad: 'días' },
            { id: 'cuentas_por_pagar', label: 'Días promedio de cuentas por pagar', tipo: 'numero', unidad: 'días' }
          ]
        },
        {
          nombre: 'Gestión de Costos',
          preguntas: [
            { id: 'costos_fijos', label: 'Costos Fijos Mensuales', tipo: 'numero', unidad: '$' },
            { id: 'costos_variables', label: 'Costos Variables (% de ventas)', tipo: 'numero', unidad: '%' },
            { id: 'control_costos', label: '¿Tiene un sistema de control de costos?', tipo: 'select', opciones: ['Sí, automatizado', 'Sí, manual', 'Parcial', 'No'] }
          ]
        }
      ]
    },
    administracion: {
      titulo: 'Administración',
      icono: Users,
      color: 'bg-blue-500',
      secciones: [
        {
          nombre: 'Estructura Organizacional',
          preguntas: [
            { id: 'num_empleados', label: 'Número total de empleados', tipo: 'numero' },
            { id: 'organigrama', label: '¿Tiene organigrama definido?', tipo: 'select', opciones: ['Sí, actualizado', 'Sí, desactualizado', 'No'] },
            { id: 'manual_procedimientos', label: '¿Cuenta con manual de procedimientos?', tipo: 'select', opciones: ['Sí, completo', 'Parcial', 'No'] }
          ]
        },
        {
          nombre: 'Gestión de Recursos Humanos',
          preguntas: [
            { id: 'rotacion_personal', label: 'Tasa de rotación anual (%)', tipo: 'numero', unidad: '%' },
            { id: 'capacitacion', label: 'Horas de capacitación por empleado/año', tipo: 'numero', unidad: 'hrs' },
            { id: 'evaluacion_desempeno', label: '¿Realiza evaluaciones de desempeño?', tipo: 'select', opciones: ['Sí, periódicas', 'Ocasionalmente', 'No'] }
          ]
        }
      ]
    },
    marketing: {
      titulo: 'Marketing',
      icono: FileText,
      color: 'bg-purple-500',
      secciones: [
        {
          nombre: 'Estrategia de Marketing',
          preguntas: [
            { id: 'plan_marketing', label: '¿Tiene plan de marketing?', tipo: 'select', opciones: ['Sí, documentado', 'Sí, informal', 'No'] },
            { id: 'presupuesto_marketing', label: 'Presupuesto de marketing (% ventas)', tipo: 'numero', unidad: '%' },
            { id: 'buyer_persona', label: '¿Tiene definido su buyer persona?', tipo: 'select', opciones: ['Sí, detallado', 'Sí, básico', 'No'] }
          ]
        },
        {
          nombre: 'Marketing Digital',
          preguntas: [
            { id: 'sitio_web', label: '¿Tiene sitio web actualizado?', tipo: 'select', opciones: ['Sí, profesional', 'Sí, básico', 'Desactualizado', 'No'] },
            { id: 'redes_sociales', label: '¿Activo en redes sociales?', tipo: 'select', opciones: ['Muy activo', 'Moderado', 'Poco activo', 'No'] },
            { id: 'trafico_web', label: 'Visitas mensuales al sitio web', tipo: 'numero' }
          ]
        }
      ]
    },
    optimizacion: {
      titulo: 'Optimización',
      icono: Zap,
      color: 'bg-orange-500',
      secciones: [
        {
          nombre: 'Tecnología y Sistemas',
          preguntas: [
            { id: 'nivel_digitalizacion', label: 'Nivel de digitalización', tipo: 'select', opciones: ['Alto (>70%)', 'Medio (30-70%)', 'Bajo (<30%)'] },
            { id: 'sistemas_integrados', label: '¿Sus sistemas están integrados?', tipo: 'select', opciones: ['Totalmente', 'Parcialmente', 'No'] },
            { id: 'automatizacion', label: '% de procesos automatizados', tipo: 'numero', unidad: '%' }
          ]
        },
        {
          nombre: 'Eficiencia Operativa',
          preguntas: [
            { id: 'tiempo_entrega', label: 'Tiempo promedio de entrega vs. competencia', tipo: 'select', opciones: ['Más rápido', 'Similar', 'Más lento', 'No sé'] },
            { id: 'tasa_defectos', label: 'Tasa de defectos/errores (%)', tipo: 'numero', unidad: '%' },
            { id: 'utilizacion_capacidad', label: 'Utilización de capacidad (%)', tipo: 'numero', unidad: '%' }
          ]
        }
      ]
    }
  };

  const handleRespuesta = (aspectoId, preguntaId, valor) => {
    setRespuestas(prev => ({
      ...prev,
      [`${aspectoId}_${preguntaId}`]: valor
    }));
  };

  const toggleSeccion = (seccionNombre) => {
    setExpandido(prev => ({
      ...prev,
      [seccionNombre]: !prev[seccionNombre]
    }));
  };

  const enviarFormulario = () => {
    if (!nombreCliente || !emailCliente || !empresaCliente) {
      alert('Por favor complete sus datos personales');
      return;
    }
    alert('¡Diagnóstico enviado exitosamente! (Esto se conectará a tu base de datos)');
    console.log('Datos:', { nombreCliente, emailCliente, empresaCliente, respuestas });
  };

  const clientesFiltrados = clientes.filter(c => 
    c.nombre.toLowerCase().includes(filtroCliente.toLowerCase()) ||
    c.empresa.toLowerCase().includes(filtroCliente.toLowerCase())
  );

  if (vista === 'ceos' && !autenticado) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 flex items-center justify-center p-6">
        <div className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-md">
          <div className="flex items-center justify-center mb-8">
            <Lock className="text-blue-600" size={48} />
          </div>
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">Panel CEO's</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Usuario</label>
              <input
                type="text"
                name="usuario"
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                placeholder="admin"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Contraseña</label>
              <input
                type="password"
                name="password"
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                placeholder="admin123"
              />
            </div>
            <button
              type="button"
              onClick={(e) => {
                const usuario = document.querySelector('input[name="usuario"]').value;
                const password = document.querySelector('input[name="password"]').value;
                if (usuario === 'admin' && password === 'admin123') {
                  setAutenticado(true);
                } else {
                  alert('Credenciales incorrectas');
                }
              }}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg transition-colors"
            >
              Iniciar Sesión
            </button>
            <button
              type="button"
              onClick={() => setVista('formulario')}
              className="w-full bg-gray-200 hover:bg-gray-300 text-gray-700 font-semibold py-3 rounded-lg transition-colors"
            >
              Volver al Formulario
            </button>
          </div>
          <p className="text-xs text-center text-gray-500 mt-4">Demo: usuario=admin, password=admin123</p>
        </div>
      </div>
    );
  }

  if (vista === 'ceos' && autenticado) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-6">
        <div className="max-w-7xl mx-auto">
          <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
            <div className="flex justify-between items-center">
              <div>
                <h1 className="text-3xl font-bold text-gray-800">Panel de CEO's</h1>
                <p className="text-gray-600">Gestión de Diagnósticos Empresariales</p>
              </div>
              <button
                onClick={() => { setAutenticado(false); setVista('formulario'); }}
                className="flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg"
              >
                <LogOut size={20} />
                Cerrar Sesión
              </button>
            </div>
          </div>

          {!clienteSeleccionado ? (
            <div className="bg-white rounded-xl shadow-lg p-6">
              <div className="flex items-center gap-4 mb-6">
                <Search className="text-gray-400" size={24} />
                <input
                  type="text"
                  placeholder="Buscar por nombre o empresa..."
                  value={filtroCliente}
                  onChange={(e) => setFiltroCliente(e.target.value)}
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Nombre</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Empresa</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Email</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Fecha</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Acciones</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {clientesFiltrados.map(cliente => (
                      <tr key={cliente.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{cliente.nombre}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{cliente.empresa}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{cliente.email}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{cliente.fecha}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm">
                          <button
                            onClick={() => setClienteSeleccionado(cliente)}
                            className="flex items-center gap-1 bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded text-xs"
                          >
                            <Eye size={14} />
                            Ver Detalle
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          ) : (
            <div className="bg-white rounded-xl shadow-lg p-8">
              <div className="flex justify-between items-start mb-6">
                <div>
                  <h2 className="text-2xl font-bold text-gray-800">{clienteSeleccionado.nombre}</h2>
                  <p className="text-gray-600">{clienteSeleccionado.empresa}</p>
                  <p className="text-sm text-gray-500">{clienteSeleccionado.email}</p>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => alert('Aquí se generaría el PDF')}
                    className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg"
                  >
                    <Download size={18} />
                    Descargar PDF
                  </button>
                  <button
                    onClick={() => setClienteSeleccionado(null)}
                    className="bg-gray-200 hover:bg-gray-300 text-gray-700 px-4 py-2 rounded-lg"
                  >
                    Volver
                  </button>
                </div>
              </div>
              <p className="text-gray-600">Aquí se mostrarían todos los datos del diagnóstico del cliente</p>
            </div>
          )}
        </div>
      </div>
    );
  }

  const aspectoData = aspectos[aspectoActual];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-6">
      <div className="max-w-6xl mx-auto">
        <div className="bg-white rounded-xl shadow-lg p-8 mb-6">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-4xl font-bold text-gray-800 mb-2">GRESANOVA</h1>
              <p className="text-xl text-gray-600">Sistema de Diagnóstico Empresarial</p>
              <p className="text-sm text-gray-500 mt-2">Desarrolla • Actualiza • Innova</p>
            </div>
            <button
              onClick={() => setVista('ceos')}
              className="flex items-center gap-2 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white px-6 py-3 rounded-lg shadow-lg"
            >
              <Lock size={20} />
              Panel CEO's
            </button>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
          <h3 className="text-lg font-bold text-gray-800 mb-4">Información del Cliente</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <input
              type="text"
              placeholder="Nombre completo"
              value={nombreCliente}
              onChange={(e) => setNombreCliente(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            />
            <input
              type="email"
              placeholder="Email"
              value={emailCliente}
              onChange={(e) => setEmailCliente(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            />
            <input
              type="text"
              placeholder="Empresa"
              value={empresaCliente}
              onChange={(e) => setEmpresaCliente(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          {Object.entries(aspectos).map(([key, aspecto]) => {
            const Icono = aspecto.icono;
            const activo = aspectoActual === key;
            return (
              <button
                key={key}
                onClick={() => setAspectoActual(key)}
                className={`flex items-center gap-3 px-6 py-4 rounded-lg transition-all ${
                  activo ? `${aspecto.color} text-white shadow-lg scale-105` : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                <Icono size={24} />
                <span className="font-semibold text-lg">{aspecto.titulo}</span>
              </button>
            );
          })}
        </div>

        <div className="bg-white rounded-xl shadow-lg p-8">
          <div className="flex items-center gap-4 mb-6">
            <div className={`${aspectoData.color} p-3 rounded-lg`}>
              <aspectoData.icono size={32} className="text-white" />
            </div>
            <div>
              <h2 className="text-3xl font-bold text-gray-800">{aspectoData.titulo}</h2>
              <p className="text-gray-600">Complete la información para identificar áreas de mejora</p>
            </div>
          </div>

          {aspectoData.secciones.map((seccion, idx) => (
            <div key={idx} className="mb-6 border border-gray-200 rounded-lg overflow-hidden">
              <button
                onClick={() => toggleSeccion(`${aspectoActual}_${idx}`)}
                className="w-full flex items-center justify-between p-4 bg-gray-50 hover:bg-gray-100"
              >
                <h3 className="text-xl font-semibold text-gray-700">{seccion.nombre}</h3>
                {expandido[`${aspectoActual}_${idx}`] ? <ChevronUp className="text-gray-500" /> : <ChevronDown className="text-gray-500" />}
              </button>

              {expandido[`${aspectoActual}_${idx}`] && (
                <div className="p-6 space-y-4">
                  {seccion.preguntas.map((pregunta) => (
                    <div key={pregunta.id} className="space-y-2">
                      <label className="block text-sm font-medium text-gray-700">{pregunta.label}</label>
                      
                      {pregunta.tipo === 'numero' && (
                        <div className="flex items-center gap-2">
                          <input
                            type="number"
                            step="0.01"
                            value={respuestas[`${aspectoActual}_${pregunta.id}`] || ''}
                            onChange={(e) => handleRespuesta(aspectoActual, pregunta.id, e.target.value)}
                            className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                            placeholder="Ingrese valor"
                          />
                          {pregunta.unidad && <span className="text-gray-600 font-medium">{pregunta.unidad}</span>}
                        </div>
                      )}

                      {pregunta.tipo === 'select' && (
                        <select
                          value={respuestas[`${aspectoActual}_${pregunta.id}`] || ''}
                          onChange={(e) => handleRespuesta(aspectoActual, pregunta.id, e.target.value)}
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                        >
                          <option value="">Seleccione una opción</option>
                          {pregunta.opciones.map((opcion, i) => (
                            <option key={i} value={opcion}>{opcion}</option>
                          ))}
                        </select>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="mt-6 flex justify-end">
          <button
            onClick={enviarFormulario}
            className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-8 py-3 rounded-lg shadow-lg font-semibold text-lg"
          >
            <Download size={20} />
            Enviar Diagnóstico
          </button>
        </div>
      </div>
    </div>
  );
};

export default DiagnosticoGresanova;

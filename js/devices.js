// Base de datos de dispositivos conectados
const devices = [
    { id: 1, name: 'PC Admin 1', ip: '192.168.10.5', vlan: 10, location: 'Edificio A - Piso 1', type: 'PC', status: 'online' },
    { id: 2, name: 'PC Admin 2', ip: '192.168.10.15', vlan: 10, location: 'Edificio A - Piso 2', type: 'PC', status: 'online' },
    { id: 3, name: 'PC Laboratorio 1', ip: '192.168.20.10', vlan: 20, location: 'Edificio B - Lab 01', type: 'Workstation', status: 'online' },
    { id: 4, name: 'PC Laboratorio 2', ip: '192.168.20.20', vlan: 20, location: 'Edificio B - Lab 02', type: 'Workstation', status: 'online' },
    { id: 5, name: 'Servidor Biblioteca', ip: '192.168.30.5', vlan: 30, location: 'Edificio C', type: 'Servidor', status: 'online' },
    { id: 6, name: 'PC Aula 101', ip: '192.168.40.10', vlan: 40, location: 'Edificio D - Aula 101', type: 'PC', status: 'online' },
    { id: 7, name: 'Impresora Aulas', ip: '192.168.40.50', vlan: 40, location: 'Edificio D - Pasillo', type: 'Impresora', status: 'online' },
    { id: 8, name: 'Servidor Principal', ip: '192.168.50.10', vlan: 50, location: 'Edificio E - Cuarto 1', type: 'Servidor', status: 'online' },
    { id: 9, name: 'Servidor BD', ip: '192.168.50.20', vlan: 50, location: 'Edificio E - Cuarto 2', type: 'Servidor', status: 'online' },
    { id: 10, name: 'Switch Edificio A', ip: '192.168.10.1', vlan: 10, location: 'Edificio A - Cuarto Técnico', type: 'Switch', status: 'online' },
    { id: 11, name: 'Access Point Patio', ip: '192.168.40.100', vlan: 40, location: 'Patio Central', type: 'Access Point', status: 'online' },
    { id: 12, name: 'Firewall WatchGuard', ip: '192.168.1.1', vlan: 1, location: 'Edificio A - Sala de Control', type: 'Firewall', status: 'online' }
];

// Lógica para diagrama de topología mejorada y selección de dispositivos sin duplicados

let selectedSourceId = null;
let selectedDestId = null;

// Agrupar dispositivos por edificio
const devicesByBuilding = {
    'Edificio A': {
        icon: '🏢',
        devices: []
    },
    'Edificio B': {
        icon: '🏬',
        devices: []
    },
    'Edificio C': {
        icon: '📚',
        devices: []
    },
    'Edificio D': {
        icon: '🎓',
        devices: []
    },
    'Edificio E': {
        icon: '🖥️',
        devices: []
    },
    'Infraestructura': {
        icon: '⚙️',
        devices: []
    }
};

// Clasificar dispositivos por edificio
function classifyDevicesByBuilding() {
    devicesByBuilding['Edificio A'].devices = devices.filter(d => d.location.includes('Edificio A'));
    devicesByBuilding['Edificio B'].devices = devices.filter(d => d.location.includes('Edificio B'));
    devicesByBuilding['Edificio C'].devices = devices.filter(d => d.location.includes('Edificio C'));
    devicesByBuilding['Edificio D'].devices = devices.filter(d => d.location.includes('Edificio D'));
    devicesByBuilding['Edificio E'].devices = devices.filter(d => d.location.includes('Edificio E'));
    devicesByBuilding['Infraestructura'].devices = devices.filter(d => 
        d.type === 'Firewall' || d.type === 'Switch' || (d.type === 'Access Point' && !d.location.includes('Edificio'))
    );
}

// Inicializar interfaz de topología
function initializeTopologyInterface() {
    classifyDevicesByBuilding();
    renderTopologyDiagram();
    populateDeviceSelectors();
    populateDeviceTable();
}

// Renderizar diagrama de topología
function renderTopologyDiagram() {
    const container = document.getElementById('topologyDiagram');
    if (!container) return;
    
    container.innerHTML = '';
    
    // Crear centro con Firewall
    const firewallDevice = devices.find(d => d.type === 'Firewall');
    const firewallCenter = document.createElement('div');
    firewallCenter.className = 'firewall-center';
    firewallCenter.innerHTML = '🔥';
    firewallCenter.title = `${firewallDevice.name} (${firewallDevice.ip})`;
    
    const firewallLabel = document.createElement('div');
    firewallLabel.className = 'firewall-center-label';
    firewallLabel.innerHTML = `🔥 FIREWALL<br>${firewallDevice.ip}`;
    firewallCenter.appendChild(firewallLabel);
    
    container.appendChild(firewallCenter);
    
    // Crear edificios alrededor del firewall
    const buildingNames = ['Edificio A', 'Edificio B', 'Edificio C', 'Edificio D', 'Edificio E'];
    
    buildingNames.forEach(buildingName => {
        const buildingDevices = devicesByBuilding[buildingName].devices;
        if (buildingDevices.length === 0) return;
        
        const buildingBox = document.createElement('div');
        buildingBox.className = 'building-box';
        
        const header = document.createElement('div');
        header.className = 'building-header';
        header.innerHTML = `${devicesByBuilding[buildingName].icon} ${buildingName}`;
        buildingBox.appendChild(header);
        
        const devicesContainer = document.createElement('div');
        devicesContainer.className = 'building-devices';
        
        buildingDevices.forEach(device => {
            const deviceEl = document.createElement('button');
            deviceEl.className = 'device-item';
            deviceEl.id = `device-topo-${device.id}`;
            deviceEl.onclick = (e) => {
                e.preventDefault();
                // Permitir selección de origen
                if (!selectedSourceId) {
                    selectSourceTopology(device.id, deviceEl);
                } else if (!selectedDestId && selectedSourceId !== device.id) {
                    selectDestTopology(device.id, deviceEl);
                }
            };
            
            deviceEl.innerHTML = `
                <div class="device-item-icon">${getDeviceIcon(device.type)}</div>
                <div class="device-item-name">${device.name}</div>
                <div class="device-item-ip">${device.ip}</div>
            `;
            
            devicesContainer.appendChild(deviceEl);
        });
        
        buildingBox.appendChild(devicesContainer);
        container.appendChild(buildingBox);
    });
}

// Seleccionar dispositivo origen desde topología
function selectSourceTopology(deviceId, element) {
    // Limpiar selección anterior
    document.querySelectorAll('.device-item.selected-source').forEach(el => {
        el.classList.remove('selected-source');
    });
    document.querySelectorAll('.device-item.disabled').forEach(el => {
        el.classList.remove('disabled');
    });
    
    selectedSourceId = deviceId;
    element.classList.add('selected-source');
    
    // Deshabilitar el mismo dispositivo en destino
    const sameDeviceEl = document.getElementById(`device-list-dest-${deviceId}`);
    if (sameDeviceEl) {
        sameDeviceEl.classList.add('disabled');
    }
    
    // Actualizar selectores inferiores
    updateDeviceSelectorUI();
}

// Seleccionar dispositivo destino desde topología
function selectDestTopology(deviceId, element) {
    // Limpiar selección anterior
    document.querySelectorAll('.device-item.selected-dest').forEach(el => {
        el.classList.remove('selected-dest');
    });
    
    selectedDestId = deviceId;
    element.classList.add('selected-dest');
    
    // Actualizar selectores inferiores
    updateDeviceSelectorUI();
}

// Seleccionar dispositivo origen desde la lista
function selectSourceFromList(deviceId) {
    selectedSourceId = deviceId;
    updateDeviceSelectorUI();
}

// Seleccionar dispositivo destino desde la lista
function selectDestFromList(deviceId) {
    selectedDestId = deviceId;
    updateDeviceSelectorUI();
}

// Actualizar UI de selectores
function updateDeviceSelectorUI() {
    // Actualizar estado visual de origen
    document.querySelectorAll('.device-selector[data-role="source"]').forEach(el => {
        el.classList.remove('selected-source', 'disabled');
        const deviceId = parseInt(el.dataset.deviceId);
        if (deviceId === selectedSourceId) {
            el.classList.add('selected-source');
        } else if (selectedDestId && deviceId === selectedDestId) {
            el.classList.add('disabled');
        }
    });
    
    // Actualizar estado visual de destino
    document.querySelectorAll('.device-selector[data-role="dest"]').forEach(el => {
        el.classList.remove('selected-dest', 'disabled');
        const deviceId = parseInt(el.dataset.deviceId);
        if (deviceId === selectedDestId) {
            el.classList.add('selected-dest');
        } else if (selectedSourceId && deviceId === selectedSourceId) {
            el.classList.add('disabled');
        }
    });
}

// Llenar selectores de dispositivos (lista mejorada)
function populateDeviceSelectorsList() {
    const sourceDiv = document.getElementById('sourceDevicesList');
    const destDiv = document.getElementById('destDevicesList');
    
    if (!sourceDiv || !destDiv) return;
    
    sourceDiv.innerHTML = '';
    destDiv.innerHTML = '';
    
    devices.forEach(device => {
        // Selector de origen
        const sourceSelector = document.createElement('button');
        sourceSelector.className = 'device-selector';
        sourceSelector.dataset.role = 'source';
        sourceSelector.dataset.deviceId = device.id;
        sourceSelector.onclick = (e) => {
            e.preventDefault();
            selectSourceFromList(device.id);
        };
        
        sourceSelector.innerHTML = `
            <div class="device-selector-info">
                <div class="device-selector-icon">${getDeviceIcon(device.type)}</div>
                <div class="device-selector-details">
                    <div class="device-selector-name">${device.name}</div>
                    <div class="device-selector-ip">${device.ip}</div>
                </div>
            </div>
            <div class="device-selector-building">${device.location.split(' - ')[0]}</div>
        `;
        sourceDiv.appendChild(sourceSelector);
        
        // Selector de destino
        const destSelector = document.createElement('button');
        destSelector.className = 'device-selector';
        destSelector.dataset.role = 'dest';
        destSelector.dataset.deviceId = device.id;
        destSelector.id = `device-list-dest-${device.id}`;
        destSelector.onclick = (e) => {
            e.preventDefault();
            selectDestFromList(device.id);
        };
        
        destSelector.innerHTML = `
            <div class="device-selector-info">
                <div class="device-selector-icon">${getDeviceIcon(device.type)}</div>
                <div class="device-selector-details">
                    <div class="device-selector-name">${device.name}</div>
                    <div class="device-selector-ip">${device.ip}</div>
                </div>
            </div>
            <div class="device-selector-building">${device.location.split(' - ')[0]}</div>
        `;
        destDiv.appendChild(destSelector);
    });
}

// Función auxiliar para obtener ícono (ya existe en app.js, aquí está duplicada para evitar dependencias)
function getDeviceIcon(type) {
    const icons = {
        'PC': '💻',
        'Workstation': '🖥️',
        'Servidor': '🗄️',
        'Impresora': '🖨️',
        'Switch': '🔄',
        'Access Point': '📡',
        'Firewall': '🔥'
    };
    return icons[type] || '📱';
}

// Simular ping desde el nuevo interfaz
function simulatePingTopology() {
    if (!selectedSourceId || !selectedDestId) {
        alert('Por favor selecciona dispositivo de origen y destino');
        return;
    }
    
    if (selectedSourceId === selectedDestId) {
        alert('El origen y destino no pueden ser el mismo');
        return;
    }
    
    // Llamar directamente a la función de ping principal en app.js
    if (typeof simulatePing === 'function') {
        simulatePing();
    } else {
        console.warn('simulatePing no está definida');
    }
}

// Limpiar selección
function resetTopologySelection() {
    selectedSourceId = null;
    selectedDestId = null;
    
    document.querySelectorAll('.device-item.selected-source, .device-item.selected-dest').forEach(el => {
        el.classList.remove('selected-source', 'selected-dest');
    });
    
    document.querySelectorAll('.device-selector.selected-source, .device-selector.selected-dest').forEach(el => {
        el.classList.remove('selected-source', 'selected-dest');
    });
    
    document.querySelectorAll('.device-item.disabled, .device-selector.disabled').forEach(el => {
        el.classList.remove('disabled');
    });
    
    // Limpiar resultados
    document.getElementById('pingResults').innerHTML = '';
}

// Exportar funciones para uso global
window.initializeTopologyInterface = initializeTopologyInterface;
window.simulatePingTopology = simulatePingTopology;
window.resetTopologySelection = resetTopologySelection;
window.selectSourceFromList = selectSourceFromList;
window.selectDestFromList = selectDestFromList;

// Llenar tabla de dispositivos
function populateDeviceTable() {
    const tbody = document.getElementById('deviceTableBody');
    tbody.innerHTML = '';
    devices.forEach(device => {
        const row = `
            <tr>
                <td><strong>${device.id}</strong></td>
                <td>${device.name}</td>
                <td><code>${device.ip}</code></td>
                <td><span class="badge bg-primary">${device.vlan}</span></td>
                <td>${device.location}</td>
                <td><span class="badge bg-info">${device.type}</span></td>
                <td><span class="status-badge status-${device.status}">${device.status.toUpperCase()}</span></td>
            </tr>
        `;
        tbody.innerHTML += row;
    });
}

// Obtener ícono según tipo de dispositivo
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

// Simular ping usando variables globales del sistema de topología
function simulatePing() {
    // Verificar que selectedSourceId y selectedDestId existan (del archivo topology.js)
    if (typeof selectedSourceId === 'undefined' || typeof selectedDestId === 'undefined') {
        alert('Por favor selecciona un dispositivo de origen y destino desde la topología');
        return;
    }
    
    if (!selectedSourceId || !selectedDestId) {
        alert('Por favor selecciona un dispositivo de origen y destino');
        return;
    }
    
    if (selectedSourceId === selectedDestId) {
        alert('El origen y destino no pueden ser el mismo dispositivo');
        return;
    }
    
    const selectedSource = devices.find(d => d.id === selectedSourceId);
    const selectedDest = devices.find(d => d.id === selectedDestId);
    
    if (!selectedSource || !selectedDest) {
        alert('No se encontraron los dispositivos seleccionados');
        return;
    }
    
    const pingBtn = document.getElementById('pingBtn');
    const pingSpinner = document.getElementById('pingSpinner');
    if (pingBtn && pingSpinner) {
        pingBtn.disabled = true;
        pingSpinner.style.display = 'inline-block';
    }
    
    // Simular latencia de ping
    setTimeout(() => {
        displayPingResults(selectedSource, selectedDest);
        if (pingBtn && pingSpinner) {
            pingBtn.disabled = false;
            pingSpinner.style.display = 'none';
        }
    }, 2000);
}

// Mostrar resultados del ping
function displayPingResults(selectedSource, selectedDest) {
    const resultsDiv = document.getElementById('pingResults');
    if (!resultsDiv) return;
    
    // Calcular latencia realista basada en VLAN y tipo de dispositivo
    let latency = Math.floor(Math.random() * 15) + 5; // 5-20ms por defecto
    
    // Aumentar latencia si están en diferente VLAN
    if (selectedSource.vlan !== selectedDest.vlan) {
        latency += Math.floor(Math.random() * 10) + 10; // +10-20ms adicionales
    }
    
    // Aumentar latencia si debe pasar por firewall
    if (selectedSource.vlan === 50 || selectedDest.vlan === 50) {
        latency += Math.floor(Math.random() * 5) + 5;
    }
    
    const status = selectedDest.status === 'online' ? 'EXITOSO' : 'FALLIDO';
    const statusColor = selectedDest.status === 'online' ? 'status-online' : 'status-offline';
    const statusIcon = selectedDest.status === 'online' ? '✓' : '✗';
    
    const routePath = calculateRoute(selectedSource, selectedDest);
    const packetLoss = selectedDest.status === 'online' ? '0%' : '100%';
    const bandwidth = Math.floor(Math.random() * 300 + 700);
    const networkLoad = Math.floor(Math.random() * 30) + 20;
    
    let html = `
        <div class="ping-result">
            <div class="ping-result-header">
                <h5>⚡ Resultado de Comunicación de Red</h5>
                <div class="result-status">
                    <span class="result-status-icon">${statusIcon}</span>
                    <span class="status-badge ${statusColor}">${status}</span>
                </div>
            </div>
            
            <div class="route-container">
                <p style="margin: 0 0 15px 0; color: #b0c4de; font-weight: bold; text-transform: uppercase; letter-spacing: 1px; font-size: 0.9em;">
                    📍 Ruta de Comunicación
                </p>
                ${routePath}
            </div>
            
            <div class="metric-row">
                <div class="metric-card">
                    <div class="metric-label">⏱️ Latencia Promedio</div>
                    <div class="metric-value">${latency}<span style="font-size: 0.6em;">ms</span></div>
                </div>
                <div class="metric-card">
                    <div class="metric-label">📤 Paquetes Enviados</div>
                    <div class="metric-value">4<span style="font-size: 0.6em;"> PKT</span></div>
                </div>
                <div class="metric-card">
                    <div class="metric-label">📥 Paquetes Recibidos</div>
                    <div class="metric-value">4<span style="font-size: 0.6em;"> PKT</span></div>
                </div>
                <div class="metric-card">
                    <div class="metric-label">📊 Pérdida de Paquetes</div>
                    <div class="metric-value">${packetLoss}</div>
                </div>
            </div>
            
            <div style="border-top: 2px solid rgba(0, 212, 255, 0.2); padding-top: 20px; margin-top: 20px;">
                <p style="margin-bottom: 15px; color: #00d4ff; font-weight: bold; text-transform: uppercase; letter-spacing: 1px; font-size: 0.9em;">
                    🔍 Análisis Detallado
                </p>
                <div class="analysis-grid">
                    <div class="analysis-item"><strong>Protocolo:</strong> ICMP</div>
                    <div class="analysis-item"><strong>TTL (Time To Live):</strong> 64</div>
                    <div class="analysis-item"><strong>Tamaño del paquete:</strong> 32 bytes</div>
                    <div class="analysis-item"><strong>Ancho disponible:</strong> ${bandwidth} Mbps</div>
                    <div class="analysis-item"><strong>Carga de red:</strong> ${networkLoad}%</div>
                    <div class="analysis-item"><strong>Estado de seguridad:</strong> ✓ Permitido</div>
                </div>
            </div>
        </div>
    `;
    
    resultsDiv.innerHTML = html;
    
    // Agregar mensaje de finalización con animación
    setTimeout(() => {
        resultsDiv.innerHTML += `
            <div class="alert alert-success" style="margin-top: 15px; border-radius: 10px; border: 2px solid #00ff00; background: rgba(0, 255, 0, 0.15);">
                <strong style="color: #00ff00;">✓ Ping completado exitosamente</strong><br>
                <span style="color: #e6edf3;">Latencia promedio: <strong>${latency}ms</strong> | Mín: <strong>${latency-2}ms</strong> | Máx: <strong>${latency+3}ms</strong></span>
            </div>
        `;
    }, 1000);
}

// Calcular ruta de comunicación
function calculateRoute(source, dest) {
    const sameLAN = source.vlan === dest.vlan;
    const firewall = devices.find(d => d.type === 'Firewall');
    
    let route = `
        <div class="ping-path">
            <div class="device-endpoint active">
                <div class="endpoint-icon">${getDeviceIcon(source.type)}</div>
                <div class="endpoint-name">${source.name}</div>
                <div class="endpoint-ip">${source.ip}</div>
            </div>
    `;
    
    if (sameLAN) {
        route += `
            <div class="connection-line"></div>
            <div class="connection-label">🔄 Switch Local VLAN ${source.vlan}</div>
            <div class="connection-line"></div>
        `;
    } else {
        route += `
            <div class="connection-line"></div>
            <div class="connection-label">🔥 Firewall Central</div>
            <div class="connection-line"></div>
            <div class="connection-label">🔄 Switch VLAN ${dest.vlan}</div>
            <div class="connection-line"></div>
        `;
    }
    
    route += `
            <div class="device-endpoint active">
                <div class="endpoint-icon">${getDeviceIcon(dest.type)}</div>
                <div class="endpoint-name">${dest.name}</div>
                <div class="endpoint-ip">${dest.ip}</div>
            </div>
        </div>
    `;
    
    return route;
}

// Limpiar resultados (ahora llamada desde topology.js)
function resetPing() {
    document.getElementById('pingResults').innerHTML = '';
}

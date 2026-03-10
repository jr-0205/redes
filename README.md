# Proyecto de Infraestructura de Red Empresarial

## Descripción General
Proyecto de ingeniería de redes que diseña e implementa una infraestructura robusta para un campus universitario con múltiples edificios. La solución integra tecnologías de seguridad avanzadas, componentes de alto rendimiento y arquitectura escalable.

## Topología de la Red
- **Tipo:** Estrella Jerárquica Distribuida con Malla Parcial para redundancia
- **Capas:** Core (Firewall), Distribution (Switches Capa 3), Access (Switches + APs)
- **Referencias:** Elementos interconectados mediante fibra óptica de alta velocidad

## Componentes Utilizados

### 1. Firewall WatchGuard
- Protección perimetral contra amenazas avanzadas (DDoS, malware, ransomware)
- Control granular de tráfico basado en usuario, aplicación y hora
- VPN segura para acceso remoto
- Cumplimiento de PCI DSS y HIPAA
- Inspección profunda de paquetes (DPI) incluyendo HTTPS

### 2. Switches Administrables Capa 3
- Velocidades Gigabit (1 Gbps) y 10 Gigabit para tráfico crítico
- Segmentación mediante VLAN (Virtual LAN)
- Redundancia con STP/RSTP para eliminar bucles
- QoS para priorizar tráfico crítico
- Gestión centralizada vía SNMP y web

### 3. Access Points Wi-Fi 6 (802.11ax)
- Velocidades hasta 9.6 Gbps teóricos
- Seguridad WPA3 contra ataques de fuerza bruta
- OFDMA para múltiples dispositivos sin congestión
- Roaming seamless entre APs
- Capacidad 128+ dispositivos por AP

### 4. Fibra Óptica Multi-Modo OM4
- Distancias hasta 550 metros a 100 Gbps
- Inmune a interferencia electromagnética
- Mayor seguridad que cobre (difícil de espiar)
- Futura-proof para tecnologías emergentes

## Tipos de Zonas de Seguridad

| Zona | Descripción | Contenido | Seguridad |
|------|-------------|----------|-----------|
| **DMZ** | Zona desmilitarizada entre Internet e infraestructura interna | Servidores web, correo, DNS públicos | Medio-Alto |
| **LAN** | Red de área local confiable con departamentos segmentados | Computadoras, impresoras, workstations | Alto |
| **ZONA CRÍTICA** | Centro de datos con máxima protección | Servidores críticos, bases de datos, AD | Máximo |

## Segmentación VLAN

| VLAN | Departamento | Red IP | Propósito |
|------|-------------|--------|-----------|
| 10 | Administración | 192.168.10.0/24 | Oficinas ejecutivas |
| 20 | Laboratorios | 192.168.20.0/24 | Equipos de investigación |
| 30 | Biblioteca | 192.168.30.0/24 | Sistemas de consulta |
| 40 | Aulas | 192.168.40.0/24 | Espacios académicos |
| 50 | Servidores | 192.168.50.0/24 | Infraestructura crítica |

## Beneficios de la Solución

### Seguridad
✓ Protección contra amenazas zero-day y ataques sofisticados
✓ Aislamiento de departamentos críticos
✓ Encriptación WPA3 en conexiones inalámbricas
✓ Alertas en tiempo real

### Rendimiento
✓ Velocidades Gigabit y 10 Gigabit
✓ QoS para aplicaciones críticas
✓ Roaming seamless para dispositivos móviles
✓ Capacidad para 500+ usuarios simultáneos

### Escalabilidad
✓ Arquitectura modular para crecimiento futuro
✓ Fácil adición de nuevos edificios y VLAN
✓ Sin afectaciones a servicios existentes

### Disponibilidad
✓ Redundancia de enlaces (99.9% uptime)
✓ Failover automático
✓ Recuperación rápida ante fallos

### Gestión
✓ Gestión centralizada
✓ Reportes automáticos
✓ Control granular por usuario y dispositivo
✓ Herramientas diagnóstico avanzadas

## Justificación de Componentes

**¿Por qué Firewall WatchGuard?**
- Detecta ataques que firewalls tradicionales no ven
- Reduce riesgo de breach de datos que pueden costar millones
- Cumple requisitos regulatorios obligatorios

**¿Por qué Switches Capa 3?**
- VLAN nativa para segmentación sin cableado adicional
- QoS prioriza aplicaciones críticas
- STP/RSTP eliminan puntos únicos de fallo

**¿Por qué Wi-Fi 6?**
- 3x más rápido que Wi-Fi 5
- Soporta 100+ usuarios en un aula sin congestión
- WPA3 protege contra ataques emergentes

**¿Por qué Fibra Óptica?**
- Distancias 20x mayores que cobre
- Velocidades 100+ Gbps posibles
- Segura contra espionaje electromagnético

## Resumen Ejecutivo
La solución implementa **defensa en profundidad** combinando múltiples capas de seguridad:
1. Firewall perimetral (WatchGuard)
2. Segmentación VLAN (Switches)
3. Encriptación inalámbrica (WPA3)
4. Control de acceso por zona (DMZ/LAN/Crítica)
5. Redundancia de enlaces (Fibra óptica)

**Resultado:** Red empresarial segura, rápida, confiable y pronta para el crecimiento futuro.

## Herramienta Interactiva - Simulador de Ping

La plataforma incluye una **herramienta de diagnóstico interactiva** que permite:

### Características:
- **Base de datos de 12 dispositivos** reales en la red (PCs, servidores, switches, firewalls, access points)
- **Simulación de ping** entre cualquier par de dispositivos
- **Cálculo automático de latencia** basado en:
  - VLAN de origen y destino
  - Tipo de dispositivo
  - Rutas a través de firewall
  - Carga de la red
  
### Dispositivos Disponibles:
1. **Administración (VLAN 10):** 2 PCs de administración
2. **Laboratorios (VLAN 20):** 2 Workstations de laboratorio
3. **Biblioteca (VLAN 30):** 1 Servidor de biblioteca
4. **Aulas (VLAN 40):** 1 PC + 1 Impresora + 1 Access Point
5. **Servidores (VLAN 50):** 2 Servidores críticos
6. **Infraestructura:** Switch, Firewall WatchGuard

### Cómo Usar:
1. Selecciona un dispositivo origen (lado izquierdo)
2. Selecciona un dispositivo destino (lado derecho)
3. Haz clic en "Ejecutar Ping"
4. Observa la ruta de comunicación, latencia y análisis detallado

### Información que Muestra:
- Ruta de la comunicación (directa si mismo VLAN, vía firewall si diferente VLAN)
- Latencia en milisegundos
- Paquetes enviados/recibidos
- Protocolo ICMP utilizado
- TTL (Time To Live)
- Ancho de banda disponible
- Estado de seguridad

---
**Proyecto de Ingeniería de Redes - Universidad XYZ**
**2023 - Todos los derechos reservados**

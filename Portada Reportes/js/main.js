// ====================================
// CONFIGURACIÓN Y DATOS
// ====================================
const CONFIG = {
    dashboards: [
        {
            id: 'mipres',
            title: 'MIPRES',
            description: 'Gestión y seguimiento de prescripciones médicas y tecnologías en salud',
            icon: 'fa-prescription-bottle-alt',
            url: 'https://app.powerbi.com/groups/310c4e2e-ab00-4cf2-b53b-56d736445f64/reports/ce482f23-4e05-4b17-9927-1857232a2fa0/ec5692e44ad6b0fce806?experience=power-bi'
        },
        {
            id: 'juntas-medicas',
            title: 'Juntas Médicas',
            description: 'Análisis y seguimiento de decisiones de juntas médicas interdisciplinarias',
            icon: 'fa-user-md',
            url: 'https://app.powerbi.com/groups/310c4e2e-ab00-4cf2-b53b-56d736445f64/reports/e3252ad7-4572-495f-819a-1ad1b0217325/5bf25a5fe6b31931ac4b?experience=power-bi'
        },
        {   
            id: 'recobros',
            title: 'Recobros',
            description: 'Control y gestión de recobros ante entidades responsables',
            icon: 'fa-file-invoice-dollar',
            url: '#/recobros'
        },
        {
            id: 'capacidad-instalada',
            title: 'Capacidad Instalada',
            description: 'Recursos físicos, tecnológicos y humanos disponibles',
            icon: 'fa-hospital',
            url: 'https://app.powerbi.com/groups/310c4e2e-ab00-4cf2-b53b-56d736445f64/reports/df27c179-ed95-48ad-a587-31c9389eea5f/c2b1d9373df57f1040c9?experience=power-bi'
        },
        {
            id: 'gestion-contratos',
            title: 'Gestión de Contratos',
            description: 'Administración integral de contratos con aseguradoras y entidades',
            icon: 'fa-file-contract',
            url: 'https://app.powerbi.com/groups/310c4e2e-ab00-4cf2-b53b-56d736445f64/reports/cdd5d8c4-b0ad-4f52-9e34-359617dda1da/c09770e1b556c620317a?experience=power-bi'
        },
        {
            id: 'descuentos-bonificaciones',
            title: 'Descuentos y Bonificaciones',
            description: 'Análisis de incentivos económicos y ajustes contractuales',
            icon: 'fa-percentage',
            url: '#/descuentos-bonificaciones'
        },
        {
            id: 'poblacion',
            title: 'Población',
            description: 'Caracterización demográfica y epidemiológica de usuarios',
            icon: 'fa-users',
            url: '#/poblacion'
        },
        {
            id: 'analisis-eps',
            title: 'Análisis de EPS Nacional',
            description: 'Comparativo y tendencias del sistema de salud a nivel nacional',
            icon: 'fa-chart-line',
            url: '#/analisis-eps'
        }
    ]
};

// ====================================
// UTILIDADES
// ====================================
const Utils = {
    /**
     * Crea un elemento HTML con clases y atributos
     * @param {string} tag - Etiqueta HTML
     * @param {string|string[]} classes - Clases CSS
     * @param {Object} attributes - Atributos adicionales
     * @returns {HTMLElement}
     */
    createElement(tag, classes = [], attributes = {}) {
        const element = document.createElement(tag);

        if (typeof classes === 'string') {
            classes = [classes];
        }

        classes.forEach(cls => element.classList.add(cls));

        Object.entries(attributes).forEach(([key, value]) => {
            element.setAttribute(key, value);
        });

        return element;
    },

    /**
     * Maneja la navegación a un dashboard
     * @param {Object} dashboard - Objeto dashboard
     */
    navigateToDashboard(dashboard) {
        console.log(`Navegando a: ${dashboard.title}`, dashboard);
        window.open(dashboard.url, '_blank');
    }
};

// ====================================
// COMPONENTE: DASHBOARD CARD
// ====================================
class DashboardCard {
    constructor(data) {
        this.data = data;
        this.element = null;
    }

    /**
     * Crea el elemento de la tarjeta
     * @returns {HTMLElement}
     */
    create() {
        // Contenedor principal
        const card = Utils.createElement('div', 'dashboard-card', {
            'data-id': this.data.id,
            'role': 'button',
            'tabindex': '0',
            'aria-label': `Abrir dashboard de ${this.data.title}`
        });

        // Contenido de la tarjeta
        const content = Utils.createElement('div', 'dashboard-card__content');

        // Icono
        const iconWrapper = Utils.createElement('div', 'dashboard-card__icon');
        const icon = Utils.createElement('i', ['fas', this.data.icon]);
        iconWrapper.appendChild(icon);

        // Título
        const title = Utils.createElement('h3', 'dashboard-card__title');
        title.textContent = this.data.title;

        // Descripción
        const description = Utils.createElement('p', 'dashboard-card__description');
        description.textContent = this.data.description;

        // Ensamblar
        content.appendChild(iconWrapper);
        content.appendChild(title);
        content.appendChild(description);
        card.appendChild(content);

        // Eventos
        this.attachEvents(card);

        this.element = card;
        return card;
    }

    /**
     * Agrega event listeners
     * @param {HTMLElement} card - Elemento de la tarjeta
     */
    attachEvents(card) {
        // Click
        card.addEventListener('click', () => {
            Utils.navigateToDashboard(this.data);
        });

        // Teclado (accesibilidad)
        card.addEventListener('keypress', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                Utils.navigateToDashboard(this.data);
            }
        });
    }
}

// ====================================
// GESTOR DE APLICACIÓN
// ====================================
class DashboardApp {
    constructor(config) {
        this.config = config;
        this.gridElement = null;
    }

    /**
     * Inicializa la aplicación
     */
    init() {
        this.gridElement = document.getElementById('dashboardGrid');
        this.render();
    }

    /**
     * Renderiza todas las tarjetas
     */
    render() {
        if (!this.gridElement) {
            console.error('Grid element not found');
            return;
        }

        this.config.dashboards.forEach(dashboardData => {
            const card = new DashboardCard(dashboardData);
            this.gridElement.appendChild(card.create());
        });
    }
}

// ====================================
// INICIALIZACIÓN
// ====================================
document.addEventListener('DOMContentLoaded', () => {
    const app = new DashboardApp(CONFIG);
    app.init();

});

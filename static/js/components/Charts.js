export default {
    props: {
        languages: Object,
        timeline: Object,
        type: {
            type: String,
            default: 'doughnut' // 'doughnut' or 'line'
        }
    },
    mounted() {
        this.renderChart();
    },
    watch: {
        languages: { handler() { this.renderChart(); }, deep: true },
        timeline: { handler() { this.renderChart(); }, deep: true },
        type() { this.renderChart(); }
    },
    methods: {
        renderChart() {
            if (this.chartInstance) {
                this.chartInstance.destroy();
            }
            
            Chart.defaults.color = '#94a3b8';
            Chart.defaults.font.family = 'Inter';

            if (this.type === 'doughnut' && this.languages) {
                this.renderDoughnut();
            } else if (this.type === 'line' && this.timeline) {
                this.renderLine();
            }
        },
        renderDoughnut() {
            const ctx = this.$refs.chartCanvas.getContext('2d');
            const sortedLangs = Object.entries(this.languages).sort((a,b) => b[1] - a[1]);
            const labels = sortedLangs.map(l => l[0]);
            const data = sortedLangs.map(l => l[1]);
            
            const backgroundColors = ['#3b82f6', '#8b5cf6', '#ec4899', '#f43f5e', '#facc15', '#10b981', '#06b6d4', '#6366f1', '#14b8a6'];

            this.chartInstance = new Chart(ctx, {
                type: 'doughnut',
                data: {
                    labels: labels,
                    datasets: [{
                        data: data,
                        backgroundColor: backgroundColors.slice(0, labels.length),
                        borderWidth: 2,
                        borderColor: '#1e293b',
                        hoverOffset: 8
                    }]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    cutout: '65%',
                    plugins: {
                        legend: { position: 'right', labels: { padding: 20, usePointStyle: true, font: { size: 13, weight: '500' } } },
                        tooltip: { backgroundColor: '#0f172a', titleColor: '#f1f5f9', bodyColor: '#cbd5e1', borderColor: '#334155', borderWidth: 1, padding: 12, usePointStyle: true }
                    }
                }
            });
        },
        renderLine() {
            const ctx = this.$refs.chartCanvas.getContext('2d');
            
            // Create a gorgeous gradient for the line chart fill
            const gradient = ctx.createLinearGradient(0, 0, 0, 300);
            gradient.addColorStop(0, 'rgba(234, 179, 8, 0.4)'); // Yellow 500 equivalent
            gradient.addColorStop(1, 'rgba(234, 179, 8, 0.0)');

            this.chartInstance = new Chart(ctx, {
                type: 'line',
                data: {
                    labels: this.timeline.labels,
                    datasets: [{
                        label: 'Commits',
                        data: this.timeline.data,
                        borderColor: '#eab308', // Yellow 500
                        backgroundColor: gradient,
                        borderWidth: 3,
                        pointBackgroundColor: '#0f172a',
                        pointBorderColor: '#eab308',
                        pointBorderWidth: 2,
                        pointRadius: 4,
                        pointHoverRadius: 6,
                        fill: true,
                        tension: 0.4 // Smooth curves
                    }]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    scales: {
                        y: { beginAtZero: true, grid: { color: 'rgba(255,255,255,0.05)' }, border: { display: false } },
                        x: { grid: { display: false }, border: { display: false }, ticks: { maxTicksLimit: 7 } }
                    },
                    plugins: {
                        legend: { display: false },
                        tooltip: { backgroundColor: '#0f172a', titleColor: '#f1f5f9', bodyColor: '#cbd5e1', borderColor: '#334155', borderWidth: 1, padding: 12, displayColors: false }
                    }
                }
            });
        }
    },
    template: `
        <div class="relative h-72 w-full">
            <canvas ref="chartCanvas"></canvas>
        </div>
    `,
    beforeUnmount() {
        if (this.chartInstance) {
            this.chartInstance.destroy();
        }
    }
}

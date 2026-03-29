export default {
    props: {
        title: String,
        value: [String, Number],
        icon: String,
        color: {
            type: String,
            default: 'blue'
        }
    },
    computed: {
        colorClasses() {
            const map = {
                'blue': 'bg-blue-500/10 text-blue-400 group-hover:bg-blue-500/20 group-hover:text-blue-300',
                'purple': 'bg-purple-500/10 text-purple-400 group-hover:bg-purple-500/20 group-hover:text-purple-300',
                'indigo': 'bg-indigo-500/10 text-indigo-400 group-hover:bg-indigo-500/20 group-hover:text-indigo-300',
                'emerald': 'bg-emerald-500/10 text-emerald-400 group-hover:bg-emerald-500/20 group-hover:text-emerald-300',
            };
            return map[this.color] || map['blue'];
        }
    },
    template: `
        <div class="relative group">
            <div class="absolute -inset-0.5 bg-gradient-to-r from-slate-700 to-slate-600 rounded-3xl blur opacity-20 group-hover:opacity-50 transition duration-500 group-hover:duration-200"></div>
            <div class="relative bg-slate-900/40 border border-white/5 rounded-3xl p-7 shadow-2xl backdrop-blur-xl flex items-center hover:-translate-y-2 hover:shadow-[0_20px_40px_-15px_rgba(0,0,0,0.5)] transition-all duration-300 overflow-hidden">
                <div class="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-bl-full -mr-16 -mt-16 transition-transform group-hover:scale-110"></div>
                <div :class="['p-4 rounded-2xl mr-5 transition-colors duration-300 flex-shrink-0 backdrop-blur-md shadow-inner border border-white/5', colorClasses]">
                    <svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" :d="icon"></path>
                    </svg>
                </div>
                <div class="z-10">
                    <p class="text-xs font-bold text-slate-400 mb-1 tracking-widest uppercase shadow-black drop-shadow-sm">{{ title }}</p>
                    <h3 class="text-4xl font-extrabold text-white tracking-tight drop-shadow-md">{{ value }}</h3>
                </div>
            </div>
        </div>
    `
}

export default {
    props: ['loading'],
    data() {
        return {
            username: ''
        };
    },
    methods: {
        onSubmit() {
            if (this.username.trim()) {
                this.$emit('search', this.username.trim());
            }
        }
    },
    template: `
        <div class="max-w-2xl mx-auto relative group z-20">
            <div class="absolute -inset-1 bg-gradient-to-r from-blue-500 to-purple-600 rounded-[2.5rem] blur opacity-25 group-hover:opacity-40 transition duration-1000 group-hover:duration-200"></div>
            <form @submit.prevent="onSubmit" class="relative flex items-center shadow-2xl rounded-[2.5rem] overflow-hidden border border-white/10 bg-slate-900/60 backdrop-blur-2xl focus-within:ring-2 focus-within:ring-purple-500/50 focus-within:border-purple-500/50 transition-all duration-300">
                <div class="pl-6 text-slate-400">
                    <svg class="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
                </div>
                <input 
                    v-model="username" 
                    type="text" 
                    placeholder="Search any GitHub username..." 
                    class="w-full bg-transparent text-white px-5 py-6 outline-none placeholder-slate-400 text-lg font-medium selection:bg-purple-500/30"
                    :disabled="loading"
                />
                <button 
                    type="submit" 
                    class="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white px-10 py-6 font-bold tracking-wide transition-all disabled:opacity-50 flex items-center shadow-[0_0_20px_rgba(168,85,247,0.3)] hover:shadow-[0_0_30px_rgba(168,85,247,0.5)]"
                    :disabled="loading || !username.trim()"
                >
                    <svg v-if="loading" class="animate-spin -ml-1 mr-3 h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                        <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                        <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    <span v-if="loading">Searching</span>
                    <span v-else>Analyze</span>
                </button>
            </form>
        </div>
    `
}

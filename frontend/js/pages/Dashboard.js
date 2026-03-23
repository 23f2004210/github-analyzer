import SearchBar from '../components/SearchBar.js';
import StatsCard from '../components/StatsCard.js';
import Charts from '../components/Charts.js';

export default {
    components: {
        SearchBar,
        StatsCard,
        Charts
    },
    data() {
        return {
            userData: null,
            loading: false,
            error: null
        };
    },
    methods: {
        async fetchAnalytics(username) {
            this.loading = true;
            this.error = null;
            this.userData = null;
            
            try {
                // Future Enhancement: Handle API URL using env/config
                const response = await fetch(`https://github-analyzer-application.onrender.com/api/user/${username}`);
                if (!response.ok) {
                    const errData = await response.json();
                    throw new Error(errData.error || 'Failed to fetch data. User might not exist.');
                }
                
                this.userData = await response.json();
            } catch (err) {
                this.error = err.message;
            } finally {
                this.loading = false;
            }
        }
    },
    template: `
        <div>
            <SearchBar @search="fetchAnalytics" :loading="loading" />
            
            <transition name="fade" mode="out-in">
                <div v-if="error" class="bg-red-500/10 border border-red-500/30 text-red-400 p-4 rounded-xl mt-8 max-w-2xl mx-auto flex items-center shadow-lg">
                    <svg class="w-6 h-6 mr-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                    <span>{{ error }}</span>
                </div>
            </transition>

            <transition name="slide-up">
                <div v-if="userData" class="mt-16 space-y-10 relative z-10">
                    <!-- Profile Header -->
                    <div class="relative">
                        <div class="absolute -inset-1 bg-gradient-to-r from-blue-600 to-purple-600 rounded-[2.5rem] blur opacity-20"></div>
                        <div class="relative flex items-center space-x-8 bg-slate-900/50 p-8 rounded-[2rem] border border-white/10 backdrop-blur-2xl shadow-2xl overflow-hidden">
                            <div class="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent pointer-events-none"></div>
                            <img :src="userData.profile.avatar_url" class="relative z-10 w-28 h-28 rounded-full border-4 border-slate-800 shadow-[0_0_30px_rgba(0,0,0,0.5)] transform hover:scale-105 transition-transform duration-500 object-cover" alt="Avatar">
                            <div class="relative z-10">
                                <h2 class="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-white to-slate-300 mb-2">{{ userData.profile.name || userData.profile.login }}</h2>
                                <a :href="userData.profile.html_url" target="_blank" class="text-purple-400 hover:text-purple-300 font-bold inline-flex items-center group transition-colors">
                                    @{{ userData.profile.login }}
                                    <svg class="w-5 h-5 ml-1 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"></path></svg>
                                </a>
                            </div>
                        </div>
                    </div>

                    <!-- KPI Cards -->
                    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        <StatsCard title="Total Repos" :value="userData.total_repos" icon="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z" color="blue" />
                        <StatsCard title="Followers" :value="userData.profile.followers" icon="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" color="purple" />
                        <StatsCard title="Following" :value="userData.profile.following" icon="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" color="indigo" />
                        <StatsCard title="Public Gists" :value="userData.profile.public_gists" icon="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" color="emerald" />
                    </div>
                    
                    <!-- Charts Area -->
                    <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
                        <div class="relative group">
                            <div class="absolute -inset-0.5 bg-gradient-to-br from-pink-500/20 to-purple-500/20 rounded-[2.5rem] blur opacity-50 group-hover:opacity-100 transition duration-500"></div>
                            <div class="relative h-full bg-slate-900/40 p-8 rounded-[2rem] border border-white/10 shadow-2xl backdrop-blur-xl flex flex-col">
                                <h2 class="text-2xl font-bold mb-8 flex items-center text-white">
                                    <span class="w-10 h-10 rounded-xl bg-gradient-to-br from-pink-500 to-purple-600 text-white flex items-center justify-center mr-4 shadow-lg shadow-pink-500/30">
                                        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"></path></svg>
                                    </span>
                                    Language Distribution
                                </h2>
                                <div class="flex-grow flex items-center justify-center">
                                    <div v-if="Object.keys(userData.languages).length > 0" class="w-full">
                                        <Charts type="doughnut" :languages="userData.languages" />
                                    </div>
                                    <div v-else class="h-64 flex items-center justify-center text-slate-500 font-medium">
                                        No language data available
                                    </div>
                                </div>
                            </div>
                        </div>
                        
                        <div class="relative group">
                            <div class="absolute -inset-0.5 bg-gradient-to-br from-yellow-500/20 to-orange-500/20 rounded-[2.5rem] blur opacity-50 group-hover:opacity-100 transition duration-500"></div>
                            <div class="relative h-full bg-slate-900/40 p-8 rounded-[2rem] border border-white/10 shadow-2xl backdrop-blur-xl flex flex-col">
                                <div class="absolute top-6 right-8 rounded-full bg-orange-500/20 text-orange-400 px-4 py-1.5 border border-orange-500/30 text-sm flex items-center font-bold shadow-lg">
                                    <span class="mr-2 animate-pulse filter drop-shadow-[0_0_8px_rgba(249,115,22,0.8)]">🔥</span> {{ userData.streak || 0 }} Day Streak
                                </div>
                                <h2 class="text-2xl font-bold mb-4 flex items-center text-white">
                                    <span class="w-10 h-10 rounded-xl bg-gradient-to-br from-yellow-400 to-orange-500 text-white flex items-center justify-center mr-4 shadow-lg shadow-orange-500/30">
                                        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path></svg>
                                    </span>
                                    Activity Snapshot
                                </h2>
                                <p class="text-slate-400 text-sm mb-6 ml-14">Past 30 days commit history</p>
                                <div class="flex-grow flex items-center justify-center">
                                    <div v-if="userData.timeline" class="w-full">
                                        <Charts type="line" :timeline="userData.timeline" />
                                    </div>
                                    <div v-else class="w-full h-48 bg-slate-800/30 rounded-2xl border border-white/5 flex items-center justify-center relative overflow-hidden backdrop-blur-md">
                                        <span class="text-sm font-medium text-slate-400">Loading timeframe details...</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </transition>
        </div>
    `
}

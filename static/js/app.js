import Dashboard from './pages/Dashboard.js';

const { createApp } = Vue;

const app = createApp({
    components: {
        Dashboard
    },
    template: `
        <div class="relative min-h-screen bg-slate-950 text-slate-200 overflow-hidden font-sans">
            <!-- Ambient Glowing Blobs -->
            <div class="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-purple-600/20 rounded-full mix-blend-screen filter blur-[128px] opacity-70 animate-[pulse_6s_ease-in-out_infinite]"></div>
            <div class="absolute bottom-[-10%] right-[-10%] w-[600px] h-[600px] bg-blue-600/10 rounded-full mix-blend-screen filter blur-[128px] opacity-60 pointer-events-none"></div>
            <div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-indigo-900/10 rounded-full mix-blend-screen filter blur-[150px] pointer-events-none"></div>

            <div class="relative container mx-auto px-6 py-12 max-w-6xl z-10">
                <header class="mb-16 mt-4 flex justify-center items-center">
                    <a href="index.html" class="flex items-center group cursor-pointer hover:opacity-80 transition-all hover:scale-105 duration-300">
                        <div class="w-12 h-12 rounded-2xl bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center mr-4 shadow-lg shadow-purple-500/30">
                            <svg class="w-7 h-7 text-white" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path fill-rule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clip-rule="evenodd"></path></svg>
                        </div>
                        <h1 class="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-300 via-purple-300 to-pink-300 tracking-tight drop-shadow-sm">GitHub Analytics</h1>
                    </a>
                </header>
                <main>
                    <Dashboard />
                </main>
            </div>
        </div>
    `
});

app.mount('#app');

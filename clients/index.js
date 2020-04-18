import Vue from 'https://cdn.jsdelivr.net/npm/vue@2.6.11/dist/vue.esm.browser.js';

new Vue({
    el: "#app",
    data() {
        return {
            form: {
                id: Date.now(),
                name: '',
                value: '',
                marked: false,
            },
            contacts: [],
        }
    },
    computed: {
        canCreate() {
            return this.form.name.trim() && this.form.value.trim();
        }
    },
    methods: {
        async createContact() {
            const {...contact} = this.form;
            const newContact = await request('/api/contacts', 'POST', contact);
            this.contacts.push(newContact);          
            this.form.name = this.form.value = '';
        },
        async markedContact(id) {
            const contact = this.contacts.find(contact => contact.id === id);
            const updated = await request(`/api/contacts/${id}`, 'PUT', {
                ...contact,
                marked: true,
            });
            contact.marked = updated.marked;
        },
        async deleteContact(id) {
            await request(`/api/contacts/${id}`, 'DELETE');
            this.contacts = this.contacts.filter(contact => contact.id !== id);
        }
    },
    async mounted() {
        this.contacts = await request('/api/contacts');
    }
});

async function request(url, method = "GET", data = null) {
    try {
        let headers = {};
        let body;
        if(data) {
            headers['Content-Type'] = 'application/json';
            body = JSON.stringify(data);
        }
        const response = await fetch(url, {
            method,
            headers,
            body,
        });
        return await response.json();
    } catch(e) {
        console.log(e);
        
    }
};
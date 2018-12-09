console.log(navigator.appVersion == '5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/66.0.3359.0 Safari/537.36');

Vue.config.productionTip = false;
Vue.config.devtools = true;

Vue.use(Vuex);

new Vue({
	el: 'main',

	store: new Vuex.Store({
		strict: true,

		modules: {
			characters: {
				state: {
					all: [],
					selected: ''
				},

				getters: {
					characters: state => state.all,
					character: state => state.all.find(c => c.Id == state.selected) || null
				},

				actions: {
					async selectCharacter({ commit }, id) {
						//await Nui.send('character-load', id)

						commit('setCharacter', id)
					},

					async deleteCharacter({ commit }, id) {
						//await Nui.send('character-delete', id)

						commit('setCharacter', null)
					},

					async setCharacters({ commit }, characters) {
						commit('setCharacters', characters)
					}
				},

				mutations: {
					setCharacter(state, id) {
						state.selected = id
					},

					setCharacters(state, characters) {
						state.all = []

						for (let i = 0; i < characters.length; i++) {
							const character = characters[i]

							character.GenderString = character.Gender == 0 ? 'Male' : 'Female'

							const dob = new Date(character.DateOfBirth)
							character.DateOfBirthFormatted = dob.getDate() + ' ' + dob.toLocaleString('en-US', {month: 'long'}) + ' ' + dob.getFullYear()

							state.all.push(character)
						}
					}
				}
			}
		}
	}),

	render: h => h(window.CharacterSelect)
});

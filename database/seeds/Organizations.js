'use strict';

const Organization = use('App/Model/Organization');

class OrganizationsSeeder {
	* run () {
		yield Organization.createMany([{
			name: 'projeto-spider',
			display_name: 'Projeto Spider',
			private: false,
		}, {
			name: 'iluminatti',
			display_name: 'Iluminatti',
			private: true,
		}]);
	}
}

module.exports = OrganizationsSeeder;
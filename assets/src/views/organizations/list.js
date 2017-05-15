import {Organizations} from 'app/api'
import {HeroTitle} from 'app/components'

export default {
  name: 'OrganizationsList',

  components: {HeroTitle},

  created() {
    Organizations.all()
      .then(res => {
        this.organizations = res.data
      })
  },

  data() {
    return {
      organizations: []
    }
  },

  methods: {
  }
}

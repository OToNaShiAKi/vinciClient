import axios from 'axios'

const Actions = {};

const BaseURL = process.env.NODE_ENV === 'development' ? '/vinci/' : 'http://hustmaths.top:8090/'

Actions.Account = ({
    commit
}, info) => {
    axios.post(BaseURL + 'account', info).then(res => {})
}

export default Actions
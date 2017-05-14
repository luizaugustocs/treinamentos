// não é o state da aplicacao, é só o state que esse reducer é responsável
export default function (state = null, action) {
    switch (action.type) {
        case 'BOOK_SELECTED' :
            return action.item;
        default:
            return state;
    }
}

// tem que retornar sempre um estado novo, ao invés de reutilizar o state antigo e só trocar algum valor
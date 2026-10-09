import api from ".";

export const getRecipesCard = async () => {
    try {
        const res = await api.get(`recipes`)
        return res.data.recipes;
    } catch (e) {
        throw e;
    }
}

export const getRecipeById = async (id: number) => {
    try {
        const res = await api.get(`recipe/${id}`)
        return res.data.recipe;
    } catch (e) {
        throw e;
    }
}
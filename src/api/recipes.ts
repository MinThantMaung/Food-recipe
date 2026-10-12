/* eslint-disable no-useless-catch */
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


export const getCuisines = async () => {
    try {
        const res = await api.get(`cuisines`)
        return res.data.data;
    } catch (e) {
        throw e;
    }
}

export const getMeals = async () => {
    try {
        const res = await api.get(`meals`)
        return res.data.data;
    } catch (e) {
        throw e;
    }
}

export const getDiets = async () => {
    try {
        const res = await api.get(`diets`)
        return res.data.data;
    } catch (e) {
        throw e;
    }
}
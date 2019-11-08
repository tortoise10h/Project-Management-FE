import { fetchAuthLoading } from '../../common/effects'
import { ENDPOINTS } from './models'

export default (dispatch, props) => ({
  getProjects: async (page = 1, offset, params) => {
    try {
      const result = await fetchAuthLoading({
        url: ENDPOINTS.getProjects,
        method: 'GET',
        params: {
          ...params,
          page,
          offset
        }
      })
      return result
    } catch (error) {
      return { success: false, message: 'Server Error' }
    }
  },
  createProject: async (newProject) => {
    try {
      const result = await fetchAuthLoading({
        url: ENDPOINTS.createProject,
        method: 'POST',
        data: newProject
      })
      return result
    } catch (error) {
      return { success: false, message: 'Server Error' }
    }
  },
  toggleFavorite: async (userId, projectId, isFavorite) => {
    try {
      const result = await fetchAuthLoading({
        url: ENDPOINTS.toggleFavorite(userId, projectId),
        method: 'PUT',
        data: {
          is_favorite: isFavorite
        }
      })
      return result
    } catch (error) {
      return { success: false, message: 'Server Error' }
    }
  }
})

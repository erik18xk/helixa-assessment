import { createAsyncThunk } from "@reduxjs/toolkit"
import * as playersAPI from "@api/players"

export const getPlayersList = createAsyncThunk(
  'state/players/GET_LIST',
  async ({ page, per_page, search }, thunkAPI) => {
    try {
      const { data } = await playersAPI.getPlayersList(page, per_page, search)
      const { data: players, meta } = data
      const { current_page, next_page, total_pages } = meta

      const hasMore = Boolean(current_page < total_pages)

      return { players, hasMore, next_page }

    } catch (err) {
      return thunkAPI.rejectWithValue({ error: err.message })
    }
  }
)
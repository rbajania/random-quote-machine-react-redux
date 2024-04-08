import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

async function randomQuote() {
    return new Promise((resolve, reject) => {
        fetch('https://quotable.io/random')
            .then(response => response.json()
                .then((data) => {
                    debugger;
                    if (data) {
                        resolve(data)
                    } else {
                        reject({ message: 'no data fetched' })
                    }
                })
            ).catch((err) =>
                reject({ message: err.message })
            );
    });
};

export const getQuote = createAsyncThunk(
    'quote/random',
    async(_, thunkAPI) => {
        try {
            return await randomQuote()
        } catch (error) {
            debugger;
            if (error instanceof Error) {
                /*let message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()*/
                let message = error.message
                return thunkAPI.rejectWithValue(message)
            }
        }
    }
)

const initialState = {
    author: '',
    quote: '',
    errorMessage: '',
    isLoading: false,
}

const quoteSlice = createSlice({
    name: 'quote',
    initialState,
    reducers: {
        reset: (state) => initialState
    },
    extraReducers: (builder) => {
        builder
            .addCase(getQuote.pending, (state) => {
                state.isLoading = true
            })
            .addCase(getQuote.fulfilled, (state, action: any) => {
                state.isLoading = false
                state.author = action.payload.author
                state.quote = action.payload.content
                state.errorMessage = ''
            })
            .addCase(getQuote.rejected, (state, action: any) => {
                state.isLoading = false
                state.errorMessage = (action.payload.errorMessage) ? action.payload.message : 'unkown error'
            })
    },
})

export const { reset } = quoteSlice.actions
export default quoteSlice.reducer
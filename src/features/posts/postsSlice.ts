import { createAsyncThunk, createSlice, nanoid, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';
import { client } from '../../api/client';

export interface Post {
    id: string,
    title: string,
    content: string,
    user?: string,
    date?: string
}


export enum Status {
    IDLE = "idle",
    LOADING = "loading",
    SUCCESS = "success",
    FAIL = "fail"
}

interface State {
    data: Post[],
    status: Status,
    error: string | null
}

const initialState: State = {
    data: [],
    status: Status.IDLE,
    error: null
}

export const fetchPosts = createAsyncThunk('posts/fetchPosts', async () => {
    const response = await client.get('/fakeApi/posts');
    return response.data;
})

const postsSlice = createSlice({
    name: 'posts',
    initialState,
    reducers: {
        postAdded: {
            prepare: (title, content, userId)  => {
                return {
                    payload: {
                        id: nanoid(),
                        date: new Date().toISOString(),
                        title,
                        content,
                        user: userId
                    }
                }
            },
            reducer: (state, action: PayloadAction<Post>) => {
                state.data.push(action.payload);
            }
        },
        postUpdated(state, action) {
            const { id, title, content } = action.payload;
            const existingPost = state.data.find(post => post.id === id);
            if (existingPost) {
                existingPost.title = title;
                existingPost.content = content;
            }
        }
  },
  extraReducers(builder) {
      builder
        .addCase(fetchPosts.pending, (state, action) => {
            state.status = Status.LOADING
        })
        .addCase(fetchPosts.fulfilled, (state, action) => {
            state.status = Status.SUCCESS
            state.data = state.data.concat(action.payload)
        })
        .addCase(fetchPosts.rejected, (state, action) => {
            state.status = Status.FAIL
            state.error = action.error.message!
        })
  }
})



export default postsSlice.reducer;
export const { postAdded, postUpdated } = postsSlice.actions;
export const selectAllPosts = (state: RootState) => state.posts.data;
export const selectPostById =  (state: RootState, postId: string) =>
state.posts.data.find(post => post.id === postId);


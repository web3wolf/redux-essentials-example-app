import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import type { RootState, AppDispatch } from './store';
import { selectAllPosts, selectPostById } from '../features/posts/postsSlice'

export const useAppDispatch = () => useDispatch<AppDispatch>()
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
// export const useAllPostSelector: TypedUseSelectorHook<RootState["posts"]> = useSelector;
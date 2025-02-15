import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { jwtDecode, JwtPayload } from "jwt-decode";
import { isUserAuth } from "./Middleware/isUserAuth";
import { loginUser } from "./Middleware/loginUser";
import { registerUser } from "./Middleware/registerUser";

const userSlice = createSlice({
    name: 'user',
    initialState: {
        isAuth: false,
        user: null,
        isRegistered: false,
    },
    reducers: {
        setCurrentUser: (state: any) => {
            const token = localStorage.getItem('token');
            if (!token) {
                state.user = null;
            }          
            else if (state.isAuth) {
                try {
                    const decodedToken = jwtDecode<JwtPayload & { email: string }>(token);
                    state.user = decodedToken;
                  } catch (error) {
                    state.user = null;
                  }
            }
        },
        setLogoutUser: (state: any) => {
            localStorage.removeItem('token');
            
            state.isAuth = false;
            state.user = null;
        }
    },
    extraReducers: (builder) => {
        builder.addCase(isUserAuth.fulfilled, (state, action: PayloadAction<any>) => {
            state.isAuth = action.payload;
        });
        builder.addCase(loginUser.fulfilled, (state, action: PayloadAction<any>) => {
            state.isAuth = action.payload;
        });
        builder.addCase(registerUser.fulfilled, (state, action: PayloadAction<any>) => {
            state.isRegistered = action.payload;
        });

    }
});

export const selectUserIsAuth = (state: any) => state.user.isAuth;
export const selectUserIsRegistered = (state: any) => state.user.isRegistered;
export const selectUser = (state: any) => state.user.user;

export const { setCurrentUser, setLogoutUser } = userSlice.actions;
export default userSlice.reducer;
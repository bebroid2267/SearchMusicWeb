import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { jwtDecode, JwtPayload } from "jwt-decode";
import { isUserAuth } from "./Middleware/isUserAuth";
import { loginUser } from "./Middleware/loginUser";
import { registerUser } from "./Middleware/registerUser";

const userSlice = createSlice({
    name: 'user',
    initialState: {
        isAuth: false,
        isAuthInProcess: false,
        user: null,
        isRegistered: false,
        isLastAuthAttemptIsFail: false,
        isLastRegisteredAttemptIsFail: false,
        isRegisteredInProcess: false,
    },
    reducers: {
        setCurrentUser: (state: any) => {
            const token = localStorage.getItem('token');
            if (!token) {
                console.log('tokena netu');
                state.user = null;
            }          
            else if (state.isAuth) {
                try {
                    console.log('try');
                    const decodedToken = jwtDecode<JwtPayload & { email: string }>(token);
                    state.user = decodedToken;
                  } catch (error) {
                    console.log('catch');
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
            state.isAuthInProcess = false;
            state.isLastAuthAttemptIsFail = false;
            state.isLastRegisteredAttemptIsFail = false;
            state.isRegistered = false;
        });

        builder.addCase(loginUser.pending, (state) => {
            state.isLastAuthAttemptIsFail = false;
            state.isAuthInProcess = true;
        });
        builder.addCase(loginUser.fulfilled, (state, action: PayloadAction<any>) => {
            state.isAuth = action.payload;
            state.isAuthInProcess = false;
            state.isLastAuthAttemptIsFail = false;
        });
        builder.addCase(loginUser.rejected, (state) => {
            state.isAuthInProcess = false;
            state.isLastAuthAttemptIsFail = true;
        });

        builder.addCase(registerUser.fulfilled, (state, action: PayloadAction<any>) => {
            state.isRegistered = action.payload;
            state.isRegisteredInProcess = false;
            state.isLastRegisteredAttemptIsFail = false;
        });

        builder.addCase(registerUser.pending, (state) => {
            state.isRegisteredInProcess = true;
            state.isLastRegisteredAttemptIsFail = false;
        });

        builder.addCase(registerUser.rejected, (state) => {
            state.isRegisteredInProcess = false;
            state.isLastRegisteredAttemptIsFail = true;
        });

    }
});

export const selectUserIsAuth = (state: any) => state.user.isAuth;
export const selectUserIsRegistered = (state: any) => state.user.isRegistered;
export const selectUser = (state: any) => state.user.user;
export const selectUserIsAuthInProcess = (state: any) => state.user.isAuthInProcess;
export const selectUserIsRegisteredInProcess = (state: any) => state.user.isRegisteredInProcess;

export const { setCurrentUser, setLogoutUser } = userSlice.actions;
export default userSlice.reducer;
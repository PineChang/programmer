package com.programmer;

import com.avos.avoscloud.AVException;
import com.avos.avoscloud.AVOSCloud;
import com.avos.avoscloud.AVUser;
import com.avos.avoscloud.LogInCallback;
import com.avos.avoscloud.RequestMobileCodeCallback;
import com.facebook.react.bridge.Callback;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;

/**
 * Created by sucy on 2016/8/13.
 */
public class User extends ReactContextBaseJavaModule {

    private LoginDialog dialog;

    public User(ReactApplicationContext reactContext) {
        super(reactContext);
       // dialog = new LoginDialog(reactContext);
       // dialog.show();
    }

    @Override
    public String getName() {
        return "User";
    }


    @ReactMethod
    public void sendVerify(String phone, final Callback error, final Callback success) {
        AVOSCloud.requestSMSCodeInBackground(phone, new RequestMobileCodeCallback() {
            @Override
            public void done(AVException e) {
                if (e == null) {
                    success.invoke();
                } else {
                    e.printStackTrace();
                    if (error != null) {
                        error.invoke(e.getCode());
                    }
                }
            }
        });
    }


    @ReactMethod
    public void verifyCode(String phone, String code, final Callback error, final Callback success) {
        AVUser.signUpOrLoginByMobilePhoneInBackground(phone, code, new LogInCallback<AVUser>() {
            @Override
            public void done(AVUser avUser, AVException e) {
                if (e == null) {
                    success.invoke();
                } else {
                    e.printStackTrace();
                    if (error != null) {
                        error.invoke(e.getCode());
                    }
                }
            }
        });
    }

    @ReactMethod
    public void isLogin(Callback callback) {
        AVUser user = AVUser.getCurrentUser();
        if (user == null) {
            callback.invoke(false);
        } else {
            callback.invoke(true);
        }
    }

    @ReactMethod
    public void getUser(Callback callback) {
        AVUser user = AVUser.getCurrentUser();
        callback.invoke(user.toString());
    }


}

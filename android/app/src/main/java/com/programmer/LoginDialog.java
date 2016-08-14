package com.programmer;

import android.content.Context;
import android.support.v7.app.AlertDialog;
import android.text.TextUtils;
import android.view.LayoutInflater;
import android.view.View;
import android.widget.Button;
import android.widget.EditText;
import android.widget.Toast;

import com.avos.avoscloud.AVException;
import com.avos.avoscloud.AVUser;
import com.avos.avoscloud.LogInCallback;
import com.avos.avoscloud.RequestMobileCodeCallback;

public class LoginDialog extends AlertDialog.Builder implements View.OnClickListener {


    private EditText phone_num;
    private EditText verify_code;

    private Button verify_button;
    private Button login;

    private String phone;

    public LoginDialog(Context context) {
        super(context);
        View view = LayoutInflater.from(context).inflate(R.layout.view_login_dailog, null, false);
        setView(view);
        phone_num = (EditText) view.findViewById(R.id.phone_num);
        verify_code = (EditText) view.findViewById(R.id.verify_code);

        verify_button = (Button) view.findViewById(R.id.verify_button);
        login = (Button) view.findViewById(R.id.login);

        verify_button.setOnClickListener(this);
        login.setOnClickListener(this);
        show();
    }


    @Override
    public void onClick(View v) {
        switch (v.getId()) {
            case R.id.verify_button:
                sendVerify();
                break;
            case R.id.login:
                verifyCode();
                break;
        }
    }


    private void sendVerify() {
         phone = phone_num.getText().toString().trim();
        if (TextUtils.isEmpty(phone)) {
            showToast("手机号输入有误");
            return;
        }
        AVUser.requestLoginSmsCodeInBackground(phone, new RequestMobileCodeCallback() {
            @Override
            public void done(AVException e) {
                if (e == null) {
                    showToast("已发送，请查收");
                } else {
                    showToast(e.getMessage());
                }
            }
        });
    }

    private void verifyCode() {
        String code = verify_code.getText().toString().trim();
        if (TextUtils.isEmpty(code)) {
            showToast("邀请码输入有误");
            return;
        }
        AVUser.signUpOrLoginByMobilePhoneInBackground(phone, code, new LogInCallback<AVUser>() {
            @Override
            public void done(AVUser avUser, AVException e) {
                if (e == null) {
                    showToast("登陆成功");
                } else {
                    showToast(e.getMessage());
                }
            }
        });
    }

    private void showToast(String text) {
        Toast.makeText(getContext(), text, Toast.LENGTH_LONG).show();
    }


}

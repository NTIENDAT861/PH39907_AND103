package com.example.asm;

import androidx.annotation.NonNull;
import androidx.appcompat.app.AppCompatActivity;
import androidx.appcompat.widget.AppCompatButton;

import android.content.Intent;
import android.os.Bundle;
import android.util.Log;
import android.util.Patterns;
import android.view.View;
import android.widget.EditText;
import android.widget.ImageView;
import android.widget.TextView;
import android.widget.Toast;

import com.google.android.gms.tasks.OnCompleteListener;
import com.google.android.gms.tasks.OnFailureListener;
import com.google.android.gms.tasks.OnSuccessListener;
import com.google.android.gms.tasks.Task;
import com.google.firebase.auth.AuthResult;
import com.google.firebase.auth.FirebaseAuth;

public class RegisterActivity extends AppCompatActivity {
    TextView tvLogin;
    ImageView ivBack;
    EditText edEmail, edPassword, edRePassword;
    AppCompatButton btnRegister;
    private FirebaseAuth firebaseAuth;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_register);
        tvLogin = findViewById(R.id.tvLogin);
        ivBack = findViewById(R.id.ivBack);
        edEmail = findViewById(R.id.edEmail);
        edPassword = findViewById(R.id.edPasswordRegister);
        edRePassword = findViewById(R.id.edRePasswordRegister);
        btnRegister = findViewById(R.id.btnRegister);

        firebaseAuth = FirebaseAuth.getInstance();

        //setOnclick Register
        btnRegister.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                Register();
            }
        });


        //setOnclick
        tvLogin.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                startActivity();
            }
        });
        ivBack.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                startActivity();
            }
        });

    }

    private void Register() {
        String email = edEmail.getText().toString();
        String pass = edPassword.getText().toString();
        if (checkRegister()) {
            firebaseAuth.createUserWithEmailAndPassword(email, pass).addOnCompleteListener(new OnCompleteListener<AuthResult>() {
                @Override
                public void onComplete(@NonNull Task<AuthResult> task) {
                    if (task.isSuccessful()) {
                        Toast.makeText(RegisterActivity.this, "Register successfully", Toast.LENGTH_SHORT).show();
                        Intent intent = new Intent(RegisterActivity.this, LoginActivity.class);
                        intent.putExtra("email", email);
                        intent.putExtra("pass", pass);
                        startActivity(intent);
                        finish();
                    } else {
                        Toast.makeText(RegisterActivity.this, "Register failed", Toast.LENGTH_SHORT).show();
                    }
                }
            });
        }


    }

    private boolean checkRegister() {

        if (edRePassword.getText().toString().equals("") || edEmail.getText().toString().equals("") || edPassword.getText().toString().equals("")) {
            Toast.makeText(this, "Please enter your information", Toast.LENGTH_SHORT).show();
            return false;
        }
        if (!edPassword.getText().toString().equals(edRePassword.getText().toString())) {
            Toast.makeText(this, "Incorrect password", Toast.LENGTH_SHORT).show();
            return false;
        }
        if (!Patterns.EMAIL_ADDRESS.matcher(edEmail.getText().toString()).matches()) {
            Toast.makeText(this, "Invalid email", Toast.LENGTH_SHORT).show();
            return false;
        }

        return true;
    }

    private void startActivity() {
        startActivity(new Intent(RegisterActivity.this, LoginActivity.class));
        finish();
    }
}
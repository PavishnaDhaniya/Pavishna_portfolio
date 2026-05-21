package com.example.calculatorapplication

import android.os.Bundle
import android.view.Menu
import android.view.MenuItem
import androidx.appcompat.app.AlertDialog
import androidx.appcompat.app.AppCompatActivity
import com.example.calculatorapplication.databinding.ActivityMainBinding

class MainActivity : AppCompatActivity() {
    private lateinit var binding: ActivityMainBinding
    private var firstNum = 0.0
    private var operator = ""

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        binding = ActivityMainBinding.inflate(layoutInflater)
        setContentView(binding.root)

        // Number Listeners
        val buttons = listOf(binding.btn0, binding.btn1, binding.btn2, binding.btn3,
            binding.btn4, binding.btn5, binding.btn6, binding.btn7,
            binding.btn8, binding.btn9, binding.btn00)

        buttons.forEach { btn ->
            btn.setOnClickListener { binding.tvResult.append(btn.text) }
        }

        // Action Listeners
        binding.btnAC.setOnClickListener { binding.tvResult.text = "" }

        binding.btnDel.setOnClickListener {
            val str = binding.tvResult.text.toString()
            if (str.isNotEmpty()) binding.tvResult.text = str.dropLast(1)
        }

        binding.btnPlus.setOnClickListener { prepareOperation("+") }
        binding.btnMinus.setOnClickListener { prepareOperation("-") }
        binding.btnMult.setOnClickListener { prepareOperation("×") }
        binding.btnDiv.setOnClickListener { prepareOperation("÷") }
        binding.btnPerc.setOnClickListener {
            val num = binding.tvResult.text.toString().toDoubleOrNull() ?: 0.0
            binding.tvResult.text = (num / 100).toString()
        }
        binding.btnDot.setOnClickListener {
            if (!binding.tvResult.text.contains(".")) binding.tvResult.append(".")
        }

        binding.btnEqual.setOnClickListener { calculate() }
    }

    private fun prepareOperation(op: String) {
        val str = binding.tvResult.text.toString()
        if (str.isNotEmpty()) {
            firstNum = str.toDoubleOrNull() ?: 0.0
            operator = op
            binding.tvResult.text = ""
        }
    }

    private fun calculate() {
        val str = binding.tvResult.text.toString()
        if (str.isNotEmpty() && operator.isNotEmpty()) {
            val secondNum = str.toDoubleOrNull() ?: 0.0
            val result = when (operator) {
                "+" -> (firstNum + secondNum).toString()
                "-" -> (firstNum - secondNum).toString()
                "×" -> (firstNum * secondNum).toString()
                "÷" -> if (secondNum != 0.0) (firstNum / secondNum).toString() else "Error"
                else -> secondNum.toString()
            }
            binding.tvResult.text = result
            operator = ""
        }
    }

    // --- NEW MENU CODE BELOW ---

    // 1. This loads the 3-dot menu into the top bar
    override fun onCreateOptionsMenu(menu: Menu?): Boolean {
        menuInflater.inflate(R.menu.main_menu, menu)
        return true
    }

    // 2. This tells the app to show the Team 8 pop-up when clicked
    override fun onOptionsItemSelected(item: MenuItem): Boolean {
        if (item.itemId == R.id.action_about) {

            AlertDialog.Builder(this)
                .setTitle("About")
                .setMessage("Created by Team 8")
                .setPositiveButton("Awesome!", null)
                .show()

            return true
        }
        return super.onOptionsItemSelected(item)
    }
}
﻿namespace _01.HelloName
{
    using System;

    class HelloName
    {
        static void Main()
        {
            string name = Console.ReadLine();
            PrintName(name);
        }

        private static void PrintName(string name)
        {                                    
            Console.WriteLine($"Hello, {name}!");
        }
    }
}
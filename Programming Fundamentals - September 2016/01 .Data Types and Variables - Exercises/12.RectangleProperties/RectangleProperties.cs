﻿namespace _12.RectangleProperties
{
    using System;

    internal class RectangleProperties
    {
        private static void Main()
        {
            double width = double.Parse(Console.ReadLine());
            double height = double.Parse(Console.ReadLine());

            double perimeter = width * 2 + height * 2;
            double area = width * height;
            double diagonal = Math.Sqrt(Math.Pow(width, 2) + Math.Pow(height, 2));

            Console.WriteLine(perimeter);
            Console.WriteLine(area);
            Console.WriteLine(diagonal);
        }
    }
}
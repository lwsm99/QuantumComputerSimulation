# Komplexe Zahlen [DE]
Um uns dem Quantencomputing zu nähern, haben wir mit der Programmierung einer Bibliothek für komplexe Zahlen begonnen. Sie enthält die grundlegenden arithmetischen Operatoren, aber auch die Konjugation und den Absolutwert und unterstützt neben der algebraischen Form auch die Polarform.


## Grundlagen
Mit den uns bisher bekannten Zahlen konnten wir bestimmte Probleme nicht lösen wie **x² = -1**. Dafür brauchen wir eine Erweiterung um die imaginären Zahlen. Durch das hinzufügen eines Imaginärteils (Im) und der Regel **i² = -1** befinden wir uns nun nicht mehr in einem Zahlenstrahl, sondern auf einer Zahlenebene. 

Eine komplexe Zahl hat die Form **z = a + bi**. **a** ist damit der Realteil (Re) und **b** der Imaginärteil (Im).


## Code
Das Ziel war es, die Idee der konzeptionellen Programmierung einzubringen, was kurz gesagt bedeutet, den Code erzählen zu lassen. Anfangs war es nicht einfach, sich auf diese Denkweise einzulassen und zu verstehen, was konzeptionelle Programmierung ist, aber nach einer Weile hat es wirklich gut funktioniert. 

Die erste Iteration wurde in JavaScript geschrieben, anfangs war es recht einfach gehalten, aber als man versuchte, die konzeptionelle Programmierung einzubauen, stellte sich heraus, dass JavaScript dafür eher ungeeignet ist, da die dynamische Typisierung und die fehlende Möglichkeit von Datensätzen es schwierig machten, den komplexen Zahlendatentyp zu erstellen. 

Nach dem Umstieg auf TypeScript war es sehr einfach, konzeptionell zu programmieren, und man konnte die Komplexität reduzieren und gleichzeitig unnötige Codezeilen entfernen. Um Default-Implementierungen zuzulassen war die Verwendung von abstrakten Klassen sinnvoller als Interfaces. Durch die Default-Implementierungen konnte man sich einige Codezeilen sparen. Der Code ist nun sehr schlank gehalten und spricht immer noch für sich selbst.



# Complex Numbers [EN]
In order to approach quantum computing we started coding a library for complex numbers. It contains basic arithmetic operators but also conjugate and the absolute value while also supporting the polar form besides the algebraic form.


## Basics
With the numbers we know so far, we could not solve certain problems like **x² = -1**. For this we need an extension around the imaginary numbers. By adding an imaginary part (Im) and the rule **i² = -1** we are now no longer in a number line, but on a number plane. 

A complex number has the form **z = a + bi**. **a** is the real part (Re) and **b** the imaginary part (Im).


## Code

The goal was to incorporate the idea of conceptual programming, which in short means that you want to tell a narrative with your code. At first it wasn't easy getting into that mindset and understanding what conceptual programming is but after a while it worked really well. 

The first iteration was written in JavaScript, at the beginning it was kept rather simple but when trying to incorporate conceptual programming, it turned out that JavaScript is rather unsuitable for this since dynamic typing and the missing option of records made it difficult to create the complex number datatype. 

After switching to TypeScript, it was very easy to program conceptually and you could reduce complexity while removing unnecessary lines of code. To enable standard implementations, it made more sense to use abstract classes as interfaces. The standard implementations saved a few lines of code. The code is now kept very lean and still speaks for itself.
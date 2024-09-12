# Testing LaTeX with GitHub Pages
ttest 4
This is an inline formula: $E = mc^2$.

Below is a block formula:

$$
\int_0^\infty e^{-x} \, dx = 1
$$

More complex equation:


a^2 + b^2 = c^2

$$
| Header 1 | Header 2 | Header 3 |
|----------|----------|----------|
| Row 1    | Data     | Data     |
| Row 2    | Data     | Data     |
| Row 3    | Data     | Data     |
$$


\[
\begin{array}{|c|c|c|c|c|c|}
\hline
\text{Customer} & K1 & K2 & K3 & K4 & K5 \\
\hline
\text{Demand} & 20 & 30 & 15 & 25 & 20 \\
\hline
\end{array}
\]





\begin{align*}
\text{Maximize} \quad & \sum_{p \in Prod} a_p \cdot x_p \\
\text{subject to} \quad & \sum_{p \in Prod} b_{p,d} \cdot x_p \leq c_d, \quad & \forall d \in Dep \\
                       & x_p \leq u_p, \quad & \forall p \in Prod \\
                       & x_p \geq 0, \quad & \forall p \in Prod.
\end{align*}





\documentclass{article}
\usepackage[english]{babel}
\usepackage[a4paper,top=2cm,bottom=2cm,left=3cm,right=3cm,marginparwidth=1.75cm]{geometry}
\usepackage{amsmath}
\usepackage{graphicx}
\usepackage[colorlinks=true, allcolors=blue]{hyperref}
\usepackage{listings} % Add this for code listings

% Configuring the listings package to handle Python code
\usepackage{color}
\definecolor{codegreen}{rgb}{0,0.6,0}
\definecolor{codegray}{rgb}{0.5,0.5,0.5}
\definecolor{codepurple}{rgb}{0.58,0,0.82}
\definecolor{backcolour}{rgb}{0.95,0.95,0.92}

\lstdefinestyle{mystyle}{
    backgroundcolor=\color{backcolour},   
    commentstyle=\color{codegreen},
    keywordstyle=\color{magenta},
    numberstyle=\tiny\color{codegray},
    stringstyle=\color{codepurple},
    basicstyle=\footnotesize\ttfamily,
    breakatwhitespace=false,         
    breaklines=true,                 
    captionpos=b,                    
    keepspaces=true,                                 
    numbersep=5pt,                  
    showspaces=false,                
    showstringspaces=false,
    showtabs=false,                  
    tabsize=4
}

\lstset{style=mystyle}


\title{Optimization Exercises and Solutions in AMPL}
\author{Morten Ness}


\begin{document}
\maketitle
\newpage



\section{Case Chemicals}
This is a classic resource allocation optimization problem.

\subsection{Exercise}
Case Chemical produces two chemical products, CS-01 and CS-02, in one of their plants. The plant operates 40 hours per week and has two departments: blending and refining. In the blending department there are five full time staff and two part-time staff. Full time staff works 40 hours and part-time staff 15 hours. The staff supervises a number of machines/processes where the blending of raw materials takes place. For every 1000 litres of CS-01 produced it is required two hours of work-time in blending. The same amount for CS-02 takes half that time. After blending, the products are refined in the refining department that has seven people in the staff. Six of them work full time and one person works only 10 hours per week. It is required 60 minutes to refine either 1000 litres of CS-01 or 500 litres of CS-02. There is no restriction on raw-supply. It is possible to sell as much CS-01 as possible. However, the demand for CS-02 is limited to 120 thousand litres per week. The financial department has calculated a profit of 0.3 per litre of CS-01 and 0.5 per litre of CS-02. The production manager wants to find an optimal production plan for this week in order to maximize the overall profit. Formulate an optimization model for this problem.


\subsection{Mathematical Formulation}

\subsubsection{Instantiated form}

\begin{align*}
\text{Maximize} \quad & 0.3X_1 + 0.5X_2 \\
\text{subject to} \quad & 0.002X_1 + 0.001X_2 \leq 5 \times 40 + 2 \times 15, \quad & \text{(Blending work hours)} \\
                       & 0.001X_1 + 0.002X_2 \leq 6 \times 40 + 1 \times 10, \quad & \text{(Refining work hours)} \\
                       & X_2 \leq 120000, \\
                       & X_1 \geq 0, \\
                       & X_2 \geq 0.
\end{align*}

\subsubsection{General form}
\begin{align*}
\text{Maximize} \quad & \sum_{p \in Prod} a_p \cdot x_p \\
\text{subject to} \quad & \sum_{p \in Prod} b_{p,d} \cdot x_p \leq c_d, \quad & \forall d \in Dep \\
                       & x_p \leq u_p, \quad & \forall p \in Prod \\
                       & x_p \geq 0, \quad & \forall p \in Prod.
\end{align*}


\subsection{AMPL code}
\subsubsection{Hardcoded}
\begin{lstlisting}[language=python]
# VARIABLES
var X1 >= 0;
var X2 >= 0;

# OBJECTIVE FUNCTION
maximize Profit: 0.3 * X1 + 0.5 * X2;

# CONSTRAINTS
s.t. Blending: 0.002 * X1 + 0.001 * X2 <= 5 * 40 + 2 * 15;
s.t. Refining: 0.001 * X1 + 0.002 * X2 <= 6 * 40 + 1 * 10;
s.t. X2_Limit: X2 <= 120000;

# SOLVE
solve;
display X1, X2;
\end{lstlisting}
\subsubsection{Dynamic code}
\begin{lstlisting}[language=python]
set PRODUCTS;
set DEPARTMENTS;

#PARAMTERS
param profit {PRODUCTS};
param time {PRODUCTS, DEPARTMENTS};
param available {DEPARTMENTS};
param demand {PRODUCTS};

#VARIABLES
var x {PRODUCTS} >= 0;

#OBJECTIVE FUNCTION
maximize total_profit:
    sum {p in PRODUCTS} (profit[p] * x[p]);

#CONSTRAINTS
subject to

processing_time {d in DEPARTMENTS}:
    sum {p in PRODUCTS} time[p, d] * x[p] <= available[d];

demandlimit {p in PRODUCTS}:
    x[p] <= demand[p];
\end{lstlisting}

\begin{lstlisting}[language=python]
set PRODUCTS := CS01, CS02;

set DEPARTMENTS := blending, refining;

param profit :=
	CS01 300
	CS02 500 ;

param time :=
	[CS01, blending] 2
	[CS01, refining] 1
	[CS02, blending] 1
	[CS02, refining] 2 ;

param available :=
	blending 230
	refining 250 ;

param demand:=
	CS01 Infinity
	CS02 120 ;
\end{lstlisting}

\subsection{Solution values}
Objective function: 66,000 \\
Variables: 

\begin{align*}
    X_1 &= 70,000 \\
    X_2 &= 90,000
\end{align*}

\newpage

\section{Transportation}
\subsection{Exercise}

There are a group of sources or supply points, such as production plants or factories, and a group of sinks or demand points, like warehouses or customers, where a product needs to be transported from the sources to the sinks. The available data includes the supply amounts, such as production quantities or capacity, the required demand or amounts that need to be shipped, and the unit cost of transportation from each source to each sink. The objective is to determine the optimal amounts to be shipped along each route in order to minimize the total transportation cost of all shipments.

\[
\begin{array}{|c|c|c|c|c|}
\hline
\text{Facility} & F1 & F2 & F3 & F4 \\
\hline
\text{Capacity} & 30 & 40 & 30 & 40 \\
\hline
\end{array}
\]



\[
\begin{array}{|c|c|c|c|c|c|}
\hline
\text{Customer} & K1 & K2 & K3 & K4 & K5 \\
\hline
\text{Demand} & 20 & 30 & 15 & 25 & 20 \\
\hline
\end{array}
\]

\textbf{Table 1:} Capacity at facilities and demand at customers (in 1000 litres).


\[
\begin{array}{|c|c|c|c|c|c|}
\hline
 & \text{K1} & \text{K2} & \text{K3} & \text{K4} & \text{K5} \\
\hline
\text{F1} & 2.80 & 2.55 & 3.25 & 4.30 & 4.35 \\
\text{F2} & 4.30 & 3.15 & 2.55 & 3.30 & 3.50 \\
\text{F3} & 3.00 & 3.30 & 2.90 & 4.30 & 3.40 \\
\text{F4} & 5.20 & 4.45 & 3.50 & 3.75 & 2.45 \\
\hline
\end{array}
\]

\textbf{Table 2:} Unit transportation costs from facilities to customers.

\subsection{Mathematical formulation}



\begin{itemize}
    \item $ \text{cost}_{f,k} $: Cost of fulfilling demand from facility $ f $ to customer $ k $.
    \item $ \text{demand}_k $: Demand of customer $ k $.
    \item $ \text{capacity}_f $: Capacity of facility $ f $.
\end{itemize}


\[
x_{f,k} \geq 0: \text{ Amount shipped from facility } f \text{ to customer } k.
\]


\[
\text{Minimize } \text{total\_cost} = \sum_{f \in F} \sum_{k \in K} x_{f,k} \cdot \text{cost}_{f,k}
\]


\begin{enumerate}
    \item \textbf{Demand Fulfillment:}
    \[
    \sum_{f \in F} x_{f,k} \geq \text{demand}_k, \quad \forall k \in K
    \]
    \item \textbf{Capacity Constraint:}
    \[
    \sum_{k \in K} x_{f,k} \leq \text{capacity}_f, \quad \forall f \in F
    \]
\end{enumerate}
\subsection{AMPL code}
    \begin{lstlisting}[language=python]
set F;
set K;

#PARAMETERS
param cost {F, K};
param demand {K};
param capacity {F};

#VARIABLES
var x {F, K} >= 0;

#OBJECTIVE FUNCTION
minimize total_cost:
    sum {f in F, k in K} (x[f, k] * cost[f, k]);
    
#CONSTRAINTS
subject to

demandfulfillement {k in K}:
	sum {f in F} (x[f, k]) >= demand[k];

capacityconstraint {f in F}:
	sum {k in K} (x[f, k]) <= capacity[f];
\end{lstlisting}

    \begin{lstlisting}[language=python]
set F := F1 F2 F3 F4;
set K := K1 K2 K3 K4 K5;

param cost: K1 K2 K3 K4 K5 :=
    F1  2.80  2.55  3.25  4.30  4.35
    F2  4.30  3.15  2.55  3.30  3.50
    F3  3.00  3.30  2.90  4.30  3.40
    F4  5.20  4.45  3.50  3.75  2.45;

param demand :=
    K1  20
    K2  30
    K3  15
    K4  25
    K5  20;
    
param capacity :=
    F1  30
    F2  40
    F3  30
    F4  40;
\end{lstlisting}   
\subsection{Solution values}
\[
\mathbf{x} = [x_{ij}] = 
\begin{bmatrix}
0 & 30000 & 0 & 0 & 0 \\
0 & 0 & 15000 & 25000 & 0 \\
20000 & 0 & 0 & 0 & 0 \\
0 & 0 & 0 & 0 & 20000
\end{bmatrix}
\quad \text{and} \quad z^* = 306250
\]
\newpage

\section{Exercise 2}
\subsection{Exercise}
\subsection{Mathematical formulation}
\subsection{AMPL code}
    \begin{lstlisting}[language=python]
\end{lstlisting}    
    \begin{lstlisting}[language=python]
\end{lstlisting}   
\subsection{Solution values}
\newpage






\section{Exercise 2}
\subsection{Exercise}
\subsection{Mathematical formulation}
\subsection{AMPL code}
    \begin{lstlisting}[language=python]
\end{lstlisting}    
\subsection{Solution values}
\newpage





\end{document}

<!-- Add this script to load MathJax -->
<script type="text/javascript" id="MathJax-script" async
  src="https://cdn.jsdelivr.net/npm/mathjax@3/es5/tex-mml-chtml.js">
</script>

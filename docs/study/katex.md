---
head:
  - - link
    - rel: stylesheet
      href: https://cdnjs.cloudflare.com/ajax/libs/KaTeX/0.5.1/katex.min.css
---

# KaTeXで数式を書く

## 添字

`x^{2}` -> $x^{2}$

`x^{2+i}` -> $x^{2+i}$

`x_{i}` -> $x_{i}$

`x_{i-1}` -> $x_{i-1}$

`x^{2}_{i}` -> $x^{2}_{i}$

`x_{i}^{2}` -> $x_{i}^{2}$

`{x_{i}}^{2}` -> ${x_{i}}^{2}$

`{x^{2}}_{i}` -> ${x^{2}}_{i}$

`x^{y^{2}}` -> $x^{y^{2}}$

`x^{y_{2}}` -> $x^{y_{2}}$

`x_{y_{i}}` -> $x_{y_{i}}$

`x_{y^{2}}` -> $x_{y^{2}}$

`x^{\prime}` -> $x^{\prime}$

`{}^{\forall}x` -> ${}^{\forall}x$

`{}^{\exists}x` -> ${}^{\exists}x$

`{}_{n}C_{r}` -> ${}_{n}C_{r}$

## 分数

`\frac{1}{2}` ->

$$\frac{1}{2}$$

`y = \frac{1}{x+1}` ->

$$y = \frac{1}{x+1}$$

## 根号記号

`\sqrt[1]{2}` ->

$$\sqrt[1]{2}$$

`L = \int_{b}^{a} \sqrt{ \left( \frac{dx}{dt} \right)^{2} + \left( \frac{dy}{dt} \right)^{2} } dt` ->

$$L = \int_{b}^{a} \sqrt{ \left( \frac{dx}{dt} \right)^{2} + \left( \frac{dy}{dt} \right)^{2} } dt$$

## シグマ記号

`\sum` -> $\sum$

`\sum^{n}_{k=1}(a_{k}+b_{k}) = \sum^{n}_{k=1}a_{k} + \sum^{n}_{k=1}b_{k}` ->

$$\sum^{n}_{k=1}(a_{k}+b_{k}) = \sum^{n}_{k=1}a_{k} + \sum^{n}_{k=1}b_{k}$$

## 積分記号

`\int` -> $\int$

`\int^{b}_{a}f(x)dx = \int^{c}_{a}f(x)dx + \int^{b}_{c}f(x)dx` ->

$$\int^{b}_{a}f(x)dx = \int^{c}_{a}f(x)dx + \int^{b}_{c}f(x)dx$$

## 省略記号

`\ldots` -> $\ldots$

`\vdots` -> $\vdots$

`\cdots` -> $\cdots$

`\ddots` -> $\ddots$

```tex
\left( \begin{array}{rrcr}
1      & 2        & \cdots & n      \\
2      & 4        & \cdots & 2n     \\
\vdots & \vdots   & \ddots & \vdots \\
m      & m\cdot 2 & \cdots & m\cdot n 
\end{array} \right) \;\;\; (n , m = 0, 1, 2, \ldots)
```

->

$
\left( \begin{array}{rrcr}
1      & 2        & \cdots & n      \\
2      & 4        & \cdots & 2n     \\
\vdots & \vdots   & \ddots & \vdots \\
m      & m\cdot 2 & \cdots & m\cdot n 
\end{array} \right) \;\;\; (n , m = 0, 1, 2, \ldots)
$

## 文字修飾記号

`\vec{x}` -> $\vec{x}$

`\hat{x}` -> $\hat{x}$

`\dot{x}` -> $\dot{x}$

`\acute{x}` -> $\acute{x}$

`\check{x}` -> $\check{x}$

`\bar{x}` -> $\bar{x}$

`\tilde{x}` -> $\tilde{x}$

`\ddot{x}` -> $\ddot{x}$

`\grave{x}` -> $\grave{x}$

`\breve{x}` -> $\breve{x}$

`\vec{a} + \vec{b} + \vec{c} + \vec{d} + \vec{e} + \vec{f}` -> $\vec{a} + \vec{b} + \vec{c} + \vec{d} + \vec{e} + \vec{f}$

## 上線

`\overline{A} \cup \overline{B} = \overline{A \cap B}` -> $\overline{A} \cup \overline{B} = \overline{A \cap B}$

## 否定記号

`a \neq b` -> $a \neq b$

## その他の数学記号

`\log` -> $\log$

`\sin` -> $\sin$

`\cos` -> $\cos$

`\tan` -> $\tan$

`\max` -> $\max$

`\min` -> $\min$

`\gcd` -> $\gcd$

`\det` -> $\det$

`\exp` -> $\exp$

`\ln` -> $\ln$

`\pm` -> $\pm$

`\mp` -> $\mp$

`\times` -> $\times$

`\div` -> $\div$

`\ast` -> $\ast$

`\star` -> $\star$

`\circ` -> $\circ$

`\bullet` -> $\bullet$

`\cdot` -> $\cdot$

`\bigcirc` -> $\bigcirc$

`\setminus` -> $\setminus$

`\wr` -> $\wr$

`\in` -> $\in$

`\ni` -> $\ni$

`\cap` -> $\cap$

`\cup` -> $\cup$

`\vee` -> $\vee$

`\wedge` -> $\wedge$

`\subset` -> $\subset$

`\subseteq` -> $\subseteq$

`\supset` -> $\supset$

`\supseteq` -> $\supseteq$

`\oplus` -> $\oplus$

`\ominus` -> $\ominus$

`\otimes` -> $\otimes$

`\oslash` -> $\oslash$

`\leq` -> $\leq$

`\geq` -> $\geq$

`\ll` -> $\ll$

`\gg` -> $\gg$

`\neq` -> $\neq$

`\equiv` -> $\equiv$

`\sim` -> $\sim$

`\cong` -> $\cong$

`\propto` -> $\propto$

`\approx` -> $\approx$

`\parallel` -> $\parallel$

`\perp` -> $\perp$

`\emptyset` -> $\emptyset$

`\angle` -> $\angle$

`\langle` -> $\langle$

`\rangle` -> $\rangle$

`\lfloor` -> $\lfloor$

`\rfloor` -> $\rfloor$

`\lceil` -> $\lceil$

`\rceil` -> $\rceil$

`\infty` -> $\infty$

`\partial` -> $\partial$

`\prime` -> $\prime$

`\ell` -> $\ell$

`\imath` -> $\imath$

`\jmath` -> $\jmath$

`\surd` -> $\surd$

`\nabla` -> $\nabla$

`\forall` -> $\forall$

`\exists` -> $\exists$

`\neg` -> $\neg$

`\backslash` -> $\backslash$

`\prod` -> $\prod$

`\coprod` -> $\coprod$

`\dagger` -> $\dagger$

`\ddagger` -> $\ddagger$

`\aleph` -> $\aleph$

`\sharp` -> $\sharp$

`\flat` -> $\flat$

`\natural` -> $\natural$

`\triangleleft` -> $\triangleleft$

`\triangleright` -> $\triangleright$

`\bigtriangleup` -> $\bigtriangleup$

`\bigtriangledown` -> $\bigtriangledown$

`\triangle` -> $\triangle$

`\Box` -> $\Box$

`\Diamond` -> $\Diamond$

`\diamond` -> $\diamond$

`\clubsuit` -> $\clubsuit$

`\diamondsuit` -> $\diamondsuit$

`\heartsuit` -> $\heartsuit$

`\spadesuit` -> $\spadesuit$

## 矢印記号

`\leftarrow` -> $\leftarrow$

`\longleftarrow` -> $\longleftarrow$

`\uparrow` -> $\uparrow$

`\Leftarrow` -> $\Leftarrow$

`\Longleftarrow` -> $\Longleftarrow$

`\Uparrow` -> $\Uparrow$

`\rightarrow` -> $\rightarrow$

`\longrightarrow` -> $\longrightarrow$

`\downarrow` -> $\downarrow$

`\Rightarrow` -> $\Rightarrow$

`\Longrightarrow` -> $\Longrightarrow$

`\Downarrow` -> $\Downarrow$

`\leftrightarrow` -> $\leftrightarrow$

`\longleftrightarrow` -> $\longleftrightarrow$

`\updownarrow` -> $\updownarrow$

`\Leftrightarrow` -> $\Leftrightarrow$

`\Longleftrightarrow` -> $\Longleftrightarrow$

`\Updownarrow` -> $\Updownarrow$

`\mapsto` -> $\mapsto$

`\longmapsto` -> $\longmapsto$

`\nearrow` -> $\nearrow$

`\hookleftarrow` -> $\hookleftarrow$

`\hookrightarrow` -> $\hookrightarrow$

`\searrow` -> $\searrow$

`\leftharpoonup` -> $\leftharpoonup$

`\rightharpoonup` -> $\rightharpoonup$

`\swarrow` -> $\swarrow$

`\leftharpoondown` -> $\leftharpoondown$

`\rightharpoondown` -> $\rightharpoondown$

`\nwarrow` -> $\nwarrow$

`\rightleftharpoons` -> $\rightleftharpoons$

## 基本的な数学記号

`\int` -> $\int$ ->

$$\int$$

`\int_{0}^{\infty}` -> $\int_{0}^{\infty}$ ->

$$\int_{0}^{\infty}$$

`\sum` -> $\sum$ ->

$$\sum$$

`\sum_{n = 1}^{\infty}` -> $\sum_{n = 1}^{\infty}$ ->

$$\sum_{n = 1}^{\infty}$$

`\lim` -> $\lim$ ->

$$\lim$$

`\lim_{n \to -\infty}` -> $\lim_{n \to -\infty}$ ->

$$\lim_{n \to -\infty}$$

## 数式モードでの空白制御

`a\;b` -> $a\;b$

`a\:b` -> $a\:b$

`a\,b` -> $a\,b$

`a\!b` -> $a\!b$

`\int\int_{G}f(x,y)dxdy` ->

$\int\int_{G}f(x,y)dxdy$

`\int\!\!\!\int_{G}f(\,x,\,y\,)\;\,dx\:dy` ->

$\int\!\!\!\int_{G}f(\,x,\,y\,)\;\,dx\:dy$

## ギリシャ文字

`\Gamma` -> $\Gamma$

`\Delta` -> $\Delta$

`\Theta` -> $\Theta$

`\Lambda` -> $\Lambda$

`\Xi` -> $\Xi$

`\Pi` -> $\Pi$

`\Sigma` -> $\Sigma$

`\Upsilon` -> $\Upsilon$

`\Phi` -> $\Phi$

`\Psi` -> $\Psi$

`\Omega` -> $\Omega$

`\alpha` -> $\alpha$

`\beta` -> $\beta$

`\gamma` -> $\gamma$

`\delta` -> $\delta$

`\epsilon` -> $\epsilon$

`\varepsilon` -> $\varepsilon$

`\zeta` -> $\zeta$

`\eta` -> $\eta$

`\theta` -> $\theta$

`\vartheta` -> $\vartheta$

`\iota` -> $\iota$

`\kappa` -> $\kappa$

`\lambda` -> $\lambda$

`\mu` -> $\mu$

`\nu` -> $\nu$

`\xi` -> $\xi$

`\pi` -> $\pi$

`\varpi` -> $\varpi$

`\rho` -> $\rho$

`\varrho` -> $\varrho$

`\sigma` -> $\sigma$

`\varsigma` -> $\varsigma$

`\tau` -> $\tau$

`\upsilon` -> $\upsilon$

`\phi` -> $\phi$

`\varphi` -> $\varphi$

`\chi` -> $\chi$

`\psi` -> $\psi$

`\omega` -> $\omega$

## 大きさの変化する括弧，矢印記号

`( \frac{x}{z} )^{2} + \left( \frac{y}{z} \right)^{2} = 1` ->

$$ ( \frac{x}{z} )^{2} + \left( \frac{y}{z} \right)^{2} = 1 $$

`f(x) = \left\{ \frac{( x + 1 )( x + 2 )}{x}\right\}` ->

$$ f(x) = \left\{ \frac{( x + 1 )( x + 2 )}{x}\right\} $$

## 行列を書く

```tex
\left( \begin{array}{rr}
a & b \\ c & d
\end{array} \right) \left( \begin{array}{r}
x \\ y
\end{array} \right) = 0 \; \Longleftrightarrow \; \left\{
\begin{array}{rrrrr}
ax & + & by & = & 0 \\
cx & + & dy & = & 0
\end{array} \right.
```

->

$$
\left( \begin{array}{rr}
a & b \\ c & d
\end{array} \right) \left( \begin{array}{r}
x \\ y
\end{array} \right) = 0 \; \Longleftrightarrow \; \left\{
\begin{array}{rrrrr}
ax & + & by & = & 0 \\
cx & + & dy & = & 0
\end{array} \right.
$$

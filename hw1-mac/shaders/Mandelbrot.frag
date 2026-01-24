#version 330 core

// Inputs to the fragment shader are outputs
// of the same name of the vertex shader
in vec2 canvas_coord; // range [-1,1]x[-1,1]

uniform vec2 center;
uniform float zoom;
uniform int maxiter;

// Output the frag color
out vec4 fragColor;

// HW1: You can define customized functions here,
// e.g. complex multiplications, helper functions
// for colormap etc.
vec2 cprod(const vec2 z1, const vec2 z2) {
    float real = z1.x * z2.x - z1.y * z2.y;
    float imag = z1.x * z2.y + z1.y * z2.x;
    return vec2(real, imag);
}

void main (void){
    
    vec2 c = center + zoom * canvas_coord;
    // HW1: Your implementation goes here. Compute
    // the value of the Mandelbrot fractal at
    // complex number c.  Then map the value to
    // some color.

    vec2 z = vec2(0.0);
    int iter = 0;

    for (int i = 0; i < maxiter; i++) {
        z = cprod(z, z) + c;
        if (length(z) > 2.0) {
            iter = i;
            break;
        }
        iter = i;
    }
    
    if (iter == maxiter - 1) { 
        fragColor = vec4(0.5, 0.5, 0.5, 1.0);
    } else {
        // Map iter to a color
        float t = sqrt(float(iter) / float(maxiter));
        fragColor = vec4(0.6 * t, 0.0, 1.0 * t, 1.0);
    }
}


#version 330 core

//材质
struct Material
{
    sampler2D diffuse;
    sampler2D specular;
    float shininess;
};

//光源
struct Light
{
    vec3 position;
    vec3 ambient;
    vec3 diffuse;
    vec3 specular;
};

in vec2 TexCoords;
in vec3 Normal;
in vec3 FragPos;

out vec4 color;

uniform vec3 viewPos;
uniform Material material;
uniform Light light;
//uniform sampler2D ourTexture;

void main()
{
    vec3 materialDiffuse = vec3(texture(material.diffuse, TexCoords));
    vec3 materialSpecular = vec3(texture(material.specular, TexCoords));
    
    
    // 环境光
    vec3 ambient = light.ambient * materialDiffuse;
    
    // 漫反射光
    vec3 norm = normalize(Normal);
    vec3 lightDir = normalize(light.position - FragPos);
    float diff = max(dot(norm, lightDir), 0.0);
    vec3 diffuse = light.diffuse * diff *materialDiffuse;
    
    // 镜面高光
    vec3 viewDir = normalize(viewPos - FragPos);
    vec3 reflectDir = reflect(-lightDir, norm);
    float spec = pow(max(dot(viewDir, reflectDir), 0.0), material.shininess);
    vec3 specular = light.specular * (spec * materialSpecular);

    vec3 result = (ambient + diffuse + specular);
    color = vec4(result, 1.0f);
}

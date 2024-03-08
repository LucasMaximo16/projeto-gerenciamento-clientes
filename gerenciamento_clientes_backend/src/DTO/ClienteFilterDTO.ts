interface FilterClients {
    nome?: string;
    telefone?: string;
    email?: string;
    coordenada_x?: number; // Coordenadas como string para simplificar o uso em query strings
    coordenada_y?: number;
}
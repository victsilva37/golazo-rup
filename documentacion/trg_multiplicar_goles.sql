CREATE OR REPLACE TRIGGER trg_estadistica_gol
BEFORE INSERT OR UPDATE ON ESTADISTICA_GOL
FOR EACH ROW
DECLARE
    v_multiplicador NUMBER;
BEGIN
    -- Obtener el multiplicador de la categoría asignada
    SELECT multiplicador
    INTO v_multiplicador
    FROM CATEGORIA
    WHERE id_categoria = :NEW.id_categoria;

    -- Aplicar el multiplicador a los goles
    :NEW.goles := :NEW.goles * v_multiplicador;
END;


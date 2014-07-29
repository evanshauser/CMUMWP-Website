<?php
/**
 * Renders template.
 *
 * @param array $data
 */
function render($template, $data = array())
{
    $path = __DIR__ . '/../templates/' . $template . '.php';
    if (file_exists($path))
    {
        extract($data);
        require($path);
    }
}

/**
 * Opens a new controller.
 *
 * @param string $controller The controller name
 * @param array $data
 */
function run($controller, $data = array())
{
    $path = __DIR__ . '/../controllers/' . $controller . '.php';
    if (file_exists($path))
    {
        extract($data);
        require($path);
    }
}



?>

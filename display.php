<?php
  session_start();
?>
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>View my code</title>
  <link rel="stylesheet" href="./styles/prism.css">
  <link rel="stylesheet" href="./styles/style.css">
  <script src="./js/prism.js"></script>
</head>
<body>

  <form action="./">
    <input type="submit" value="return">
  </form>
  <button>Copy</button>
  <?php
    if(isset($_GET['f'])){
      $file = trim($_GET['f']);
      $_SESSION['query'] = $file;

      $str = file_get_contents("./files/".$file);
      $_SESSION['file'] = $str;
      //sanit
      $str = str_replace("&","&amp",$str);
      $str = str_replace("<","&lt",$str);
      $str = str_replace(">","&gt",$str);
      $str = trim($str);
      $extension = pathinfo("./files/".$file)['extension'];
      switch ($extension) {
        case 'c':
          $language = 'c';
          break;
        case 'py':
          $language = 'python';
          break;
        case 'java':
          $language = 'java';
          break;
        case 'html':
          $language = 'html';
          break;
        default:
          $language = 'c';
          break;
      }
      echo "<blockquote cite=\"\"><pre><code class=\"code language-".$language."\">".$str."</code></pre></blockquote>";
      }else {
      header('Location: /code/?r=query_empty');
    }
  ?>
  <script>
    function loadFile(filePath) {
      var result = null;
      var xmlhttp = new XMLHttpRequest();
      xmlhttp.open("GET", filePath, false);
      xmlhttp.send();
      if (xmlhttp.status==200) {
        result = xmlhttp.responseText;
      }
      return result;
    }

    let filename = <?php echo json_encode($_GET['f']); ?>;
    let file = loadFile("./files/"+filename);

    document.querySelector('button').addEventListener('click',function(){
      navigator.clipboard.writeText(file);
    });
  </script>
  <form action="./">
    <input type="submit" value="return">
  </form>
</body>
</html>

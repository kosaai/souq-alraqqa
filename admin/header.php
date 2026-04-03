<?php
  require_once 'functions.php';
  starter_backoffice_menu(__('شعار الرأس', 'starter'));
?>


<div class="mb-body">
  <?php if( is_writable( WebThemes::newInstance()->getCurrentThemePath() . "images/") ) { ?>

    <!-- LOGO PREVIEW -->
    <div class="mb-box">
      <div class="mb-head"><i class="fa fa-cog"></i> <?php _e('معاينة الشعار', 'starter'); ?></div>

      <?php if(file_exists( WebThemes::newInstance()->getCurrentThemePath() . "images/logo.jpg" ) ) { ?>
        <div class="mb-inside">
          <img class="mb-image-preview" border="0" alt="<?php echo osc_esc_html( osc_page_title() ); ?>" src="<?php echo osc_current_web_theme_url('images/logo.jpg');?>" />
        </div>

        <form action="<?php echo osc_admin_render_theme_url('oc-content/themes/' . osc_current_web_theme() . '/admin/header.php');?>" method="post" enctype="multipart/form-data">
          <input type="hidden" name="action_specific" value="remove" />

          <div class="mb-foot">
            <button type="submit" class="mb-button"><?php _e('يزيل', 'starter');?></button>
          </div>
        </form>

      <?php } else { ?>
        <div class="mb-inside">
          <div class="mb-warning">
            <?php _e('لم يتم تحميل أي شعار حتى الآن', 'starter'); ?>
          </div>
        </div>
      <?php } ?>
    </div>



    <!-- LOGO UPLOAD -->
    <div class="mb-box">
      <div class="mb-head"><i class="fa fa-upload"></i> <?php _e('تحميل الشعار', 'starter'); ?></div>

      <form action="<?php echo osc_admin_render_theme_url('oc-content/themes/' . osc_current_web_theme() . '/admin/header.php'); ?>" method="post" enctype="multipart/form-data">
        <input type="hidden" name="action_specific" value="upload_logo" />

        <div class="mb-inside">
          <div class="mb-points">
            <div class="mb-row">- <strong><?php _e('بعد رفع شعار جديد، لا تنسَ تحديث ذاكرة المتصفح المؤقتة (CTRL + R أو CTRL + F5)', 'starter'); ?></strong></div>
            <div class="mb-row">- <?php _e('الحجم المفضل للشعار هو 230×60 بكسل.', 'starter'); ?></div>
            <div class="mb-row">- <?php _e('يُسمح بالتنسيقات التالية: png، gif، jpg', 'starter'); ?></div>

            <?php if( file_exists( WebThemes::newInstance()->getCurrentThemePath() . "images/logo.jpg" ) ) { ?>
              <div class="mb-row">- <?php _e('سيؤدي تحميل شعار آخر إلى استبدال الشعار الحالي.', 'starter'); ?></div>
            <?php } ?>
          </div>

          <input type="file" name="logo" id="package" />
        </div>
 
        <div class="mb-foot">
          <button type="submit" class="mb-button"><?php _e('رفع', 'starter');?></button>
        </div>
      </form>
    <?php } else { ?>
      <div class="mb-warning">
        <div class="mb-row">
          <?php
            $msg  = sprintf(__('مجلد الصور <strong>%s</strong> غير قابل للكتابة على الخادم الخاص بك', 'starter'), WebThemes::newInstance()->getCurrentThemePath() ."images/" ) .", ";
            $msg .= __("تعذّر على النظام تحميل صورة الشعار من لوحة الإدارة.", 'starter') . ' ';
            $msg .= __('يرجى جعل مجلد الصور المذكور أعلاه قابلاً للكتابة.', 'starter') . ' ';
            echo $msg;
          ?>
        </div>

        <div class="mb-row">
          <?php _e('لجعل المجلد قابلاً للكتابة على نظام يونكس، نفّذ هذا الأمر من الطرفية:', 'starter'); ?>
        </div>

        <div class="mb-row">
          chmod a+w <?php echo WebThemes::newInstance()->getCurrentThemePath() ."images/" ; ?>
        </div>
      </div>
    <?php } ?>
  </div>
</div>

<?php echo starter_footer(); ?>
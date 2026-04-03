<?php 
  // INTERNAL USE FOR AJAX. IF NO AJAX, SHOW CONTACT PAGE
  if(isset($_GET['ajaxRequest']) && $_GET['ajaxRequest'] == '1') {
    error_reporting(0);
    ob_clean();
    osc_current_web_theme_path('ajax.php');
    exit;
  }
?>


<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" dir="<?php echo starter_is_rtl() ? 'rtl' : 'ltr'; ?>" lang="<?php echo str_replace('_', '-', osc_current_user_locale()); ?>">
<head>
  <?php osc_current_web_theme_path('head.php') ; ?>
  <meta name="robots" content="noindex, nofollow" />
  <meta name="googlebot" content="noindex, nofollow" />
  <script type="text/javascript" src="<?php echo osc_current_web_theme_js_url('jquery.validate.min.js') ; ?>"></script>
</head>

<body id="body-contact">
  <?php osc_current_web_theme_path('header.php') ; ?>
  <div id="contact-wrap" class="content cont_us">
    <h1>&nbsp;</h1>

    <div id="contact-ins" class="inner round3">
      <h2 class="contact">
        <span><?php _e("اتصل بنا", 'starter'); ?></span>
      </h2>

      <ul id="error_list"></ul>
      <form action="<?php echo osc_base_url(true) ; ?>" method="post" name="contact_form" id="contact" <?php if(osc_contact_attachment()) { echo 'enctype="multipart/form-data"'; };?>>
        <input type="hidden" name="page" value="contact" />
        <input type="hidden" name="action" value="contact_post" />

        <?php if(osc_is_web_user_logged_in()) { ?>
          <input type="hidden" name="yourName" value="<?php echo osc_esc_html( osc_logged_user_name() ); ?>" />
          <input type="hidden" name="yourEmail" value="<?php echo osc_logged_user_email();?>" />
        <?php } else { ?>
          <label for="yourName"><span><?php _e('اسمك', 'starter'); ?></span></label> 
          <span class="input-box"><i class="fa fa-user"></i><?php ContactForm::your_name(); ?></span>

          <label for="yourEmail"><span><?php _e('عنوان بريدك  الإلكتروني', 'starter'); ?></span><div class="req">*</div></label>
          <span class="input-box"><i class="fa fa-envelope"></i><?php ContactForm::your_email(); ?></span>
        <?php } ?>

        <label for="subject"><span><?php _e("موضوع", 'starter'); ?></span><div class="req">*</div></label>
        <span class="input-box"><i class="fa fa-pencil"></i><?php ContactForm::the_subject(); ?></span>

        <label for="message"><span><?php _e("رسالة", 'starter'); ?></span><div class="req">*</div></label>
        <span class="input-box last"><?php ContactForm::your_message(); ?></span>


        <?php if(osc_contact_attachment()) { ?>
          <div class="attachment">
            <div class="att-box">
              <label class="status">
                <span class="wrap"><i class="fa fa-paperclip"></i> <span><?php _e('تحميل الملف', 'starter'); ?></span></span>
                <?php ContactForm::your_attachment(); ?>
              </label>
            </div>

            <div class="text"><?php _e('الامتدادات المسموح بها:', 'starter'); ?> <?php echo osc_allowed_extension(); ?>.</div>
            <div class="text"><?php _e('الحد الأقصى للحجم:', 'starter'); ?> <?php echo round(osc_max_size_kb()/1000, 1); ?>Mb.</div>
          </div>
        <?php } ?>

        <div class="req-what"><div class="req">*</div><div class="small-info"><?php _e('هذه الخانة مطلوبه', 'starter'); ?></div></div>

        <?php starter_show_recaptcha(); ?>

        <button type="submit" id="blue"><?php _e('أرسل رسالة', 'starter'); ?></button>
      </fieldset>
      </form>
    </div>
  </div>


  <?php ContactForm::js_validation() ; ?>
  <?php osc_current_web_theme_path('footer.php') ; ?>
</body>
</html>
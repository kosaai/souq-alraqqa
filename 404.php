<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" dir="<?php echo starter_is_rtl() ? 'rtl' : 'ltr'; ?>" lang="<?php echo str_replace('_', '-', osc_current_user_locale()); ?>">
  <head>
    <?php osc_current_web_theme_path('head.php') ; ?>
    <meta name="robots" content="noindex, nofollow" />
    <meta name="googlebot" content="noindex, nofollow" />
    <script type="text/javascript" src="<?php echo osc_current_web_theme_js_url('jquery.validate.min.js') ; ?>"></script>
  </head>

  <body>
    <?php osc_current_web_theme_path('header.php') ; ?>
    <div class="content error err400">
      <img class="err-img" src="<?php echo osc_base_url(); ?>oc-content/themes/starter/images/404.png" alt="<?php _e('خطأ 404', 'starter'); ?>"/>

      <h1><?php _e('عفوًا، هناك خطأ ما', 'starter'); ?></h1>
      <div class="reason"><?php _e('عذرًا، لكن عنوان الويب الذي أدخلته لم يعد متاحًا.', 'starter'); ?></div>

      <div class="link-wrap">
        <a class="tr1" href="<?php echo osc_base_url();?>"><?php _e('اذهب للمنزل', 'starter'); ?><i class="fa fa-external-link"></i></a>
        <a class="tr1" href="<?php echo osc_search_url(); ?>"><?php _e('إظهار القوائم', 'starter'); ?><i class="fa fa-external-link"></i></a>

        <?php if(osc_is_web_user_logged_in()) { ?>
          <a class="tr1" href="<?php echo osc_user_dashboard_url(); ?>"><?php _e('حسابي', 'starter'); ?><i class="fa fa-external-link"></i></a>
        <?php } else { ?>
          <a class="tr1" href="<?php echo osc_register_account_url(); ?>"><?php _e('تسجيل الدخول', 'starter'); ?><i class="fa fa-external-link"></i></a>
        <?php } ?>
      </div>
    </div>

    <?php osc_current_web_theme_path('footer.php') ; ?>
  </body>
</html>
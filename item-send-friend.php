<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" dir="<?php echo starter_is_rtl() ? 'rtl' : 'ltr'; ?>" lang="<?php echo str_replace('_', '-', osc_current_user_locale()); ?>">
<head>
  <?php osc_current_web_theme_path('head.php') ; ?>
  <meta name="robots" content="noindex, nofollow" />
  <meta name="googlebot" content="noindex, nofollow" />
  <script type="text/javascript" src="<?php echo osc_current_web_theme_js_url('jquery.validate.min.js') ; ?>"></script>
</head>


<body id="body-item-send-friend" class="fw-supporting">
  <div style="display:none!important;"><?php osc_current_web_theme_path('header.php'); ?></div></div></div>
  <?php 
    $content_only = Params::getParam('contentOnly');
    $type = Params::getParam('type');
    $user_id = Params::getParam('userId'); 
  ?>

  <!-- ITEM PREVIEW (CONTENT ONLY) -->
  <?php if($content_only == 1) { ?>
    <?php 
      ob_get_clean();
      require_once osc_base_path().'oc-content/themes/starter/item.php'; 
      exit;
    ?>  

  <?php } ?>

  <?php if($type == 'send_friend' || $type == '') { ?>
    <!-- SEND TO FRIEND FORM -->

    <div id="send-friend-form" class="fw-box" style="display:block;">
      <div class="head">
        <h2><?php _e('أرسل إلى صديق', 'starter'); ?></h2>
        <a href="#" class="def-but fw-close-button round3"><i class="fa fa-times"></i> <?php _e('يغلق', 'starter'); ?></a>
      </div>

      <div class="item-sample">
        <a class="one" href="<?php echo osc_item_url(); ?>">
          <div class="image">
            <div class="img">
              <?php if(osc_count_item_resources()) { ?>
                <?php for( $i = 0; $i <= 0; $i++ ) { ?>
                  <img src="<?php echo osc_resource_thumbnail_url(); ?>" alt="<?php echo osc_esc_html(osc_item_title()); ?>" />
                <?php } ?>
              <?php } else { ?>
                <img src="<?php echo osc_current_web_theme_url('images/no-image.png'); ?>" alt="<?php echo osc_esc_html(osc_item_title()); ?>" />
              <?php } ?>
            </div>
          </div>

          <div class="text">
            <div class="title"><?php echo osc_item_title(); ?></div>
            <div class="desc"><?php echo osc_highlight(osc_item_description(), 80); ?></div>

            <div class="price">
              <span><?php echo osc_item_formated_price(); ?></span>
            </div>
          </div>
        </a>
      </div>

      <div class="middle">
        <h1 class="h1-error-fix"></h1>
        <ul id="error_list"></ul>

        <form target="_top" id="sendfriend" name="sendfriend" action="<?php echo osc_base_url(true); ?>" method="post">
          <fieldset>
            <input type="hidden" name="action" value="send_friend_post" />
            <input type="hidden" name="page" value="item" />
            <input type="hidden" name="id" value="<?php echo osc_item_id(); ?>" />

            <?php if(osc_is_web_user_logged_in()) { ?>
              <input type="hidden" name="yourName" value="<?php echo osc_esc_html( osc_logged_user_name() ); ?>" />
              <input type="hidden" name="yourEmail" value="<?php echo osc_logged_user_email();?>" />
            <?php } else { ?>
              <div class="row">
                <label for="yourName"><span><?php _e('اسمك', 'starter'); ?></span><div class="req">*</div></label> 
                <div class="input-box"><i class="fa fa-user-o"></i><?php SendFriendForm::your_name(); ?></div>

                <label for="yourEmail"><span><?php _e('عنوان بريدك  الإلكتروني', 'starter'); ?></span><div class="req">*</div></label>
                <div class="input-box"><i class="fa fa-envelope-o"></i><?php SendFriendForm::your_email(); ?></div>
              </div>
            <?php } ?>

            <div class="row">
              <label for="friendName"><span><?php _e("اسم صديقك", 'starter'); ?></span><div class="req">*</div></label>
              <div class="input-box"><i class="fa fa-user"></i><?php SendFriendForm::friend_name(); ?></div>

              <label for="friendEmail"><span><?php _e("عنوان البريد الإلكتروني لصديقك", 'starter'); ?></span><div class="req">*</div></label>
              <div class="input-box last"><i class="fa fa-envelope"></i><?php SendFriendForm::friend_email(); ?></div>
            </div>
                  
            <div class="row last">   
              <label for="message"><span><?php _e("رسالة", 'starter'); ?></span><div class="req">*</div></label>
              <?php SendFriendForm::your_message(); ?>
            </div>

            <?php starter_show_recaptcha(); ?>

            <button type="<?php echo (osc_get_preference('forms_ajax', 'starter_theme') == 1 ? 'button' : 'submit'); ?>" id="send-message"><?php _e('أرسل رسالة', 'starter'); ?></button>
          </fieldset>
        </form>

        <?php SendFriendForm::js_validation(); ?>
      </div>
    </div>
  <?php } ?>

 

  <?php if($type == 'add_comment') { ?>
    <!-- NEW COMMENT FORM -->
    <?php if( osc_comments_enabled() && (osc_reg_user_post_comments () && osc_is_web_user_logged_in() || !osc_reg_user_post_comments()) ) { ?>
      <form target="_top" action="<?php echo osc_base_url(true) ; ?>" method="post" name="comment_form" id="comment_form" class="fw-box" style="display:block;">
        <input type="hidden" name="action" value="add_comment" />
        <input type="hidden" name="page" value="item" />
        <input type="hidden" name="id" value="<?php echo osc_item_id() ; ?>" />

        <fieldset>
          <div class="head">
            <h2><?php _e('إضافة تعليق جديد', 'starter'); ?></h2>
            <a href="#" class="def-but fw-close-button round3"><i class="fa fa-times"></i> <?php _e('يغلق', 'starter'); ?></a>
          </div>

          <div class="item-sample">
            <a class="one" href="<?php echo osc_item_url(); ?>">
              <div class="image">
                <div class="img">
                  <?php if(osc_count_item_resources()) { ?>
                    <?php for( $i = 0; $i <= 0; $i++ ) { ?>
                      <img src="<?php echo osc_resource_thumbnail_url(); ?>" alt="<?php echo osc_esc_html(osc_item_title()); ?>" />
                    <?php } ?>
                  <?php } else { ?>
                    <img src="<?php echo osc_current_web_theme_url('images/no-image.png'); ?>" alt="<?php echo osc_esc_html(osc_item_title()); ?>" />
                  <?php } ?>
                </div>
              </div>

              <div class="text">
                <div class="title"><?php echo osc_item_title(); ?></div>
                <div class="desc"><?php echo osc_highlight(osc_item_description(), 80); ?></div>

                <div class="price">
                  <span><?php echo osc_item_formated_price(); ?></span>
                </div>
              </div>
            </a>
          </div>

          <div class="middle">
            <?php CommentForm::js_validation(); ?>
            <h1 class="h1-error-fix"></h1>
            <ul id="comment_error_list"></ul>

            <?php if(osc_is_web_user_logged_in()) { ?>
              <input type="hidden" name="authorName" value="<?php echo osc_esc_html( osc_logged_user_name() ); ?>" />
              <input type="hidden" name="authorEmail" value="<?php echo osc_logged_user_email();?>" />
            <?php } else { ?>
              <div class="row">
                <label for="authorName"><?php _e('اسم', 'starter') ; ?></label> 
                <div class="input-box"><i class="fa fa-user"></i><?php CommentForm::author_input_text(); ?></div>
              </div>

              <div class="row">
                <label for="authorEmail"><span><?php _e('بريد إلكتروني', 'starter') ; ?></span><span class="req">*</span></label> 
                <div class="input-box"><i class="fa fa-at"></i><?php CommentForm::email_input_text(); ?></div>
              </div>                  
            <?php } ?>

            <div class="row" id="last">
              <label for="title"><?php _e('عنوان', 'starter') ; ?></label>
              <div class="input-box"><i class="fa fa-pencil"></i><?php CommentForm::title_input_text(); ?></div>
            </div>
            
            <?php osc_run_hook('item_comment_form'); ?>
        
            <div class="row">
              <label for="body"><?php _e('تعليق', 'starter') ; ?></label> 
              <?php CommentForm::body_input_textarea(); ?>
            </div>

            <div class="row">
              <button type="<?php echo (osc_get_preference('forms_ajax', 'starter_theme') == 1 ? 'button' : 'submit'); ?>" id="send-comment"><?php _e('إرسال تعليق', 'starter') ; ?></button>
            </div>
          </div>
        </fieldset>
      </form>
    <?php } ?>
  <?php } ?>




  <?php if($type == 'publicContact') { ?>
    <!-- PUBLIC PROFILE CONTACT SELLER -->

    <?php if(osc_reg_user_can_contact() && osc_is_web_user_logged_in() || !osc_reg_user_can_contact() ) { ?>
      <form target="_top" action="<?php echo osc_base_url(true) ; ?>" method="post" name="contact_form" id="contact_form_public" class="fw-box" style="display:block;">
        <input type="hidden" name="action" value="contact_post" class="nocsrf" />
        <input type="hidden" name="page" value="user" />
        <input type="hidden" name="id" value="<?php echo $user_id; ?>" />

        <div class="head">
          <h2><?php _e('اتصل بالبائع', 'starter'); ?></h2>
          <a href="#" class="def-but fw-close-button round3"><i class="fa fa-times"></i> <?php _e('يغلق', 'starter'); ?></a>
        </div>

        <div class="middle">
          <fieldset>
            <?php ContactForm::js_validation(); ?>
            <h1 class="h1-error-fix"></h1>
            <ul id="error_list"></ul>

            <?php if(!osc_is_web_user_logged_in()) { ?>
              <div class="row">
                <label for="yourName"><?php _e('اسم', 'starter'); ?></label> 
                <div class="input-box"><i class="fa fa-user"></i><?php ContactForm::your_name(); ?></div>
              </div>

              <div class="row">
                <label for="yourEmail"><span><?php _e('بريد إلكتروني', 'starter') ; ?></span><span class="req">*</span></label> 
                <div class="input-box"><i class="fa fa-at"></i><?php ContactForm::your_email(); ?></div>
              </div>
            <?php } ?>              

            <div class="row last">
              <label for="phoneNumber"><span><?php _e('رقم التليفون', 'starter') ; ?></span></label>
              <div class="input-box"><i class="fa fa-phone"></i><?php ContactForm::your_phone_number(); ?></div>
            </div>

            <div class="row">
              <?php ContactForm::your_message(); ?>
            </div>

            <?php starter_show_recaptcha(); ?>

            <button type="<?php echo (osc_get_preference('forms_ajax', 'starter_theme') == 1 ? 'button' : 'submit'); ?>" id="send-public-message"><?php _e('أرسل رسالة', 'starter') ; ?></button>
          </fieldset>
        </div>
      </form>
    <?php } ?>
  <?php } ?>

  <div style="display:none!important;"><div><div>
    <?php osc_current_web_theme_path('footer.php') ; ?>
  </div></div></div>
</body>
</html>
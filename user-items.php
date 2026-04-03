<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" dir="<?php echo starter_is_rtl() ? 'rtl' : 'ltr'; ?>" lang="<?php echo str_replace('_', '-', osc_current_user_locale()); ?>">
<head>
  <?php osc_current_web_theme_path('head.php') ; ?>
  <meta name="robots" content="noindex, nofollow" />
  <meta name="googlebot" content="noindex, nofollow" />
</head>
<body id="body-user-items" class="body-ua">
  <?php osc_current_web_theme_path('header.php') ; ?>
  <div class="content user_account">
    <div id="sidebar" class="sc-block">
      <?php echo starter_user_menu(); ?>
    </div>


    <?php
      $item_type = Params::getParam('itemType');

      if($item_type == 'active') {
        $title = __('القوائم النشطة', 'starter');
        $status = __('نشيط', 'starter');
      } else if ($item_type == 'pending_validate') {
        $title = __('قوائم لم يتم التحقق من صحتها', 'starter');
        $status = __('لم يتم التحقق من صحتها', 'starter');
      } else if ($item_type == 'expired') {
        $title = __('القوائم منتهية الصلاحية', 'starter');
        $status = __('منتهي الصلاحية', 'starter');
      } else {
        $title = __('قوائمك', 'starter');
        $status = '';
      }


      // IN CASE ITEMS ARE NOT PROPERLY SHOWN, USE THIS FUNCTION BLOCK 
      // $active_items = Item::newInstance()->findItemTypesByUserID(osc_logged_user_id(), 0,null, $item_type); 
      // View::newInstance()->_exportVariableToView('items', $active_items); 
    ?>




    <div id="main" class="items">
      <div class="inside">
        <?php osc_run_hook('user_items_top'); ?>
        
        <?php if(osc_count_items() > 0) { ?>
          <?php while(osc_has_items()) { ?>
            <div class="us-item round3 tr1">
              <?php
                $item_extra = starter_item_extra( osc_item_id() );

                if($item_type == '') {
                  if(osc_item_is_expired()) {
                    $type = __('منتهي الصلاحية', 'starter');
                    $type_raw = 'expired';
                  } else if (osc_item_is_inactive()) {
                    $type = __('لم يتم التحقق من صحتها', 'starter');
                    $type_raw = 'pending_validate';
                  } else if (osc_item_is_active()) {
                    $type = __('نشيط', 'starter');
                    $type_raw = 'active';
                  } else {
                    $type = '';
                    $type_raw = '';
                  }
                } else {
                  $type = '';
                }
              ?>

              <?php if(osc_images_enabled_at_items()) { ?>
                <a href="<?php echo osc_item_url(); ?>" class="image tr1<?php echo (osc_count_item_resources() <= 0 ? ' no-img' : ''); ?> ?>">
                  <span class="image-count"><i class="fa fa-camera"></i> <?php echo osc_count_item_resources(); ?>x</span>

                  <?php if(osc_count_item_resources() > 0) { ?>
                    <img src="<?php echo osc_resource_thumbnail_url(); ?>" title="<?php echo osc_esc_html(osc_item_title()); ?>" alt="<?php echo osc_esc_html(osc_item_title()); ?>" class="tr1" />
                  <?php } else { ?>
                    <img src="<?php echo osc_current_web_theme_url('images/no-image.png'); ?>" title="<?php echo osc_esc_html(osc_item_title()); ?>" alt="<?php echo osc_esc_html(osc_item_title()); ?>" class="tr1" />
                  <?php } ?>

                  <?php if($item_type == '') { ?>
                    <div class="type <?php echo $type_raw; ?>"><span class="round2"><?php echo $type; ?></span></div>
                  <?php } ?>

                  <?php if(osc_item_is_premium()) { ?>
                    <div class="premium"><?php _e('غالي', 'starter'); ?></div>
                  <?php } ?>
                </a>
              <?php } ?>

              <div class="right">
                <a href="<?php echo osc_item_url(); ?>" class="title"><?php echo osc_highlight(osc_item_title(), 80); ?></a>

                <div class="buttons">
                  <a class="view round2 tr1" href="<?php echo osc_item_url(); ?>"><?php _e('يفتح', 'starter'); ?></a>
                  <a class="edit round2 tr1" href="<?php echo osc_item_edit_url(); ?>" rel="nofollow"><?php _e('يحرر', 'starter'); ?></a>

                  <?php if(osc_item_is_inactive()) {?>
                    <a class="activate round2 tr1" href="<?php echo osc_item_activate_url(); ?>"><?php _e('التحقق من صحة', 'starter'); ?></a>
                  <?php } else { ?>
                    <?php 
                      if (osc_rewrite_enabled()) { 
                        if( $item_extra['i_sold'] == 0 ) {
                          $sold_url = '?itemId=' . osc_item_id() . '&markSold=1&secret=' . osc_item_field('s_secret') . '&itemType=' . $item_type;
                          $reserved_url = '?itemId=' . osc_item_id() . '&markSold=2&secret=' . osc_item_field('s_secret') . '&itemType=' . $item_type;
                        } else {
                          $sold_url = '?itemId=' . osc_item_id() . '&markSold=0&secret=' . osc_item_field('s_secret') . '&itemType=' . $item_type;
                          $reserved_url = '?itemId=' . osc_item_id() . '&markSold=0&secret=' . osc_item_field('s_secret') . '&itemType=' . $item_type;
                        }
                      } else {
                        if( $item_extra['i_sold'] == 0 ) {
                          $sold_url = '&itemId=' . osc_item_id() . '&markSold=1&secret=' . osc_item_field('s_secret') . '&itemType=' . $item_type;
                          $reserved_url = '&itemId=' . osc_item_id() . '&markSold=2&secret=' . osc_item_field('s_secret') . '&itemType=' . $item_type;
                        } else {
                          $sold_url = '&itemId=' . osc_item_id() . '&markSold=0&secret=' . osc_item_field('s_secret') . '&itemType=' . $item_type;
                          $reserved_url = '&itemId=' . osc_item_id() . '&markSold=0&secret=' . osc_item_field('s_secret') . '&itemType=' . $item_type;
                        }
                      }
                    ?>

                    <?php if(!in_array(osc_item_category_id(), starter_extra_fields_hide())) { ?>
                      <a class="sold round2 tr1" href="<?php echo osc_user_list_items_url() . $sold_url; ?>"><?php echo ($item_extra['i_sold'] == 1 ? __('قم بإلغاء تحديد "تم البيع".', 'starter') : __('وضع علامة على أنه مباع', 'starter')); ?></a>
                      <a class="reserved round2 tr1" href="<?php echo osc_user_list_items_url() . $reserved_url; ?>"><?php echo ($item_extra['i_sold'] == 2 ? __('إلغاء الحجز', 'starter') : __('احتياطي', 'starter')); ?></a>
                    <?php } ?>                  

                  <?php } ?>

                  <?php if(function_exists('republish_link_raw') && republish_link_raw(osc_item_id())) { ?>
                    <a class="republish round2 tr1" href="<?php echo republish_link_raw(osc_item_id()); ?>" rel="nofollow"><?php _e('إعادة النشر', 'starter'); ?></a>
                  <?php } ?>

                  <a class="delete round2 tr1" onclick="return confirm('<?php echo osc_esc_js(__('هل أنت متأكد أنك تريد حذف هذه القائمة؟ لا يمكن التراجع عن هذا الإجراء.', 'starter')); ?>')" href="<?php echo osc_item_delete_url(); ?>" rel="nofollow"><?php _e('يمسح', 'starter'); ?></a>

                  <?php osc_run_hook('user_items_action', osc_item_id()); ?>
                </div>

                <?php osc_run_hook('user_items_body', osc_item_id()); ?>

                <div class="middle">
                  <?php if( osc_price_enabled_at_items() ) { ?>
                    <div class="price"><?php echo osc_item_formated_price(); ?></div>
                  <?php } ?>

                  <div class="category round2"><i class="fa fa-cog"></i> <?php echo osc_item_category(); ?></div>

                  <?php if($item_extra['i_sold'] == 1) { ?>
                    <div><?php _e('مُباع!', 'starter'); ?></div>
                  <?php } else if($item_extra['i_sold'] == 2) { ?>
                    <div><?php _e('محجوز!', 'starter'); ?></div>
                  <?php } ?>

                  <?php if(!in_array(osc_item_category_id(), starter_extra_fields_hide())) { ?>
                    <?php if(starter_condition_name($item_extra['i_condition'])) { ?>
                      <div class="condition has-tooltip" title="<?php echo osc_esc_html(__('حالة', 'starter')); ?>"><span><?php echo starter_condition_name($item_extra['i_condition']); ?></span></div>
                    <?php } ?>

                    <?php if(starter_transaction_name($item_extra['i_transaction'])) { ?>
                      <div class="transaction has-tooltip" title="<?php echo osc_esc_html(__('عملية', 'starter')); ?>"><span><?php echo starter_transaction_name($item_extra['i_transaction']); ?></span></div>
                    <?php } ?>
                  <?php } ?>

                  <div><span class="label"><?php _e('الخبرة', 'starter'); ?>:</span> <?php echo (date('Y', strtotime(osc_item_field('dt_expiration'))) > 3000 ? __('أبداً', 'starter') : date('Y/m/d', strtotime(osc_item_field('dt_expiration')))); ?></div>
                  <div><span class="label"><?php _e('حانة', 'starter'); ?>:</span> <?php echo date('Y/m/d', strtotime(osc_item_pub_date())); ?></div>
                  <?php if(osc_item_mod_date() <> '') { ?>
                    <div>
                      <span class="label"><?php _e('وزارة الدفاع', 'starter'); ?>:</span> <?php echo date('Y/m/d', strtotime(osc_item_mod_date())); ?>
                    </div>
                  <?php } ?>
                </div>
              </div>
            </div>
          <?php } ?>
        <?php } else { ?>
          <div class="ua-items-empty"><span><?php echo sprintf(__('لم يتم العثور عليها في القوائم %s', 'starter'), $status); ?></span></div>
        <?php } ?>

        <?php osc_run_hook('user_items_bottom'); ?>
        
        <?php if(osc_list_total_pages() > 1)  { ?>
          <div class="paginate">
            <?php for($i = 0 ; $i < osc_list_total_pages() ; $i++) { ?>
              <a class="<?php if($i == osc_list_page()) { ?>searchPaginationSelected<?php } else { ?>searchPaginationNonSelected<?php } ?>" href="<?php echo osc_user_list_items_url($i + 1) . '&itemType=' . $item_type; ?>"><?php echo ($i + 1); ?></a>
            <?php } ?>
          </div>
        <?php } ?>
      </div>
    </div>
  </div>

  <?php osc_current_web_theme_path('footer.php') ; ?>
</body>
</html>